using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Timing;
using Abp.UI;
using AbpCompanyName.AbpProjectName.MaterialRequisitions.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public class MaterialRequisitionAppService : AbpProjectNameAppServiceBase, IMaterialRequisitionAppService
    {
        private readonly IRepository<MaterialRequisitionHeader, long> _headerRepository;
        private readonly IRepository<MaterialRequisitionLine, long> _lineRepository;
        private readonly IRepository<DeliveryDemand, long> _demandRepository;
        private readonly IRepository<DeliveryDemandLine, long> _demandLineRepository;

        public MaterialRequisitionAppService(
            IRepository<MaterialRequisitionHeader, long> headerRepository,
            IRepository<MaterialRequisitionLine, long> lineRepository,
            IRepository<DeliveryDemand, long> demandRepository,
            IRepository<DeliveryDemandLine, long> demandLineRepository)
        {
            _headerRepository = headerRepository;
            _lineRepository = lineRepository;
            _demandRepository = demandRepository;
            _demandLineRepository = demandLineRepository;
        }

        public async Task<PagedResultDto<MaterialRequisitionListDto>> GetAll(GetMaterialRequisitionsInput input)
        {
            var query = _headerRepository.GetAllIncluding(x => x.Lines)
                .Where(x => string.IsNullOrEmpty(input.RequisitionFactory) || x.RequisitionFactory.Contains(input.RequisitionFactory))
                .Where(x => string.IsNullOrEmpty(input.IssueFactory) || x.IssueFactory.Contains(input.IssueFactory))
                .Where(x => string.IsNullOrEmpty(input.RequisitionNo) || x.RequisitionNo.Contains(input.RequisitionNo))
                .Where(x => !input.RequisitionDate.HasValue || x.RequisitionDate == input.RequisitionDate.Value.Date)
                .Where(x => !input.IsDeliveryRequired.HasValue || x.IsDeliveryRequired == input.IsDeliveryRequired.Value)
                .Where(x => string.IsNullOrEmpty(input.DeliveryMethod) || x.DeliveryMethod == input.DeliveryMethod)
                .Where(x => string.IsNullOrEmpty(input.ApplicantNo) || x.ApplicantNo.Contains(input.ApplicantNo))
                .Where(x => string.IsNullOrEmpty(input.SpecialStock) || x.SpecialStock == input.SpecialStock)
                .Where(x => string.IsNullOrEmpty(input.SplitStatus) || x.SplitStatus == input.SplitStatus)
                .Where(x => string.IsNullOrEmpty(input.SourceConfirmStatus) || x.SourceConfirmStatus == input.SourceConfirmStatus)
                .Where(x => string.IsNullOrEmpty(input.MaterialNo) || x.Lines.Any(l => l.MaterialNo.Contains(input.MaterialNo)));

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderByDescending(x => x.RequisitionDate)
                .ThenByDescending(x => x.Id)
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            return new PagedResultDto<MaterialRequisitionListDto>(
                totalCount,
                await MapHeaders(items)
            );
        }

        public async Task<MaterialRequisitionSplitDto> GetForSplit(EntityDto<long> input)
        {
            var header = await GetHeader(input.Id);
            var demands = await _demandRepository.GetAllIncluding(x => x.Lines)
                .Where(x => x.MaterialRequisitionHeaderId == input.Id && x.Status != MaterialRequisitionStatuses.Cancelled)
                .OrderByDescending(x => x.CreationTime)
                .ToListAsync();

            return new MaterialRequisitionSplitDto
            {
                Header = (await MapHeaders(new List<MaterialRequisitionHeader> { header })).First(),
                ExistingDemands = await MapDemands(demands)
            };
        }

        public async Task<DeliveryDemandDto> SaveSplitDraft(SaveSplitInput input)
        {
            return await SaveSplit(input, MaterialRequisitionStatuses.Draft);
        }

        public async Task<DeliveryDemandDto> ConfirmSplit(SaveSplitInput input)
        {
            return await SaveSplit(input, MaterialRequisitionStatuses.Confirmed);
        }

        public async Task ConfirmSplitDraft(CancelSplitDraftInput input)
        {
            var demand = await _demandRepository.GetAllIncluding(x => x.Lines)
                .FirstOrDefaultAsync(x => x.Id == input.DeliveryDemandId);
            if (demand == null)
            {
                throw new EntityNotFoundException(typeof(DeliveryDemand), input.DeliveryDemandId);
            }
            if (demand.Status != MaterialRequisitionStatuses.Draft)
            {
                throw new UserFriendlyException("只有草稿状态的配送需求可以确认。");
            }

            foreach (var line in demand.Lines)
            {
                var remaining = await GetRemainingQuantity(line.MaterialRequisitionLineId, demand.Id);
                if (line.DemandQuantity > remaining)
                {
                    throw new UserFriendlyException("草稿本次数量不能超过当前待拆数量。");
                }
            }

            demand.Status = MaterialRequisitionStatuses.Confirmed;
            await _demandRepository.UpdateAsync(demand);
            await CurrentUnitOfWork.SaveChangesAsync();
            await RecalculateHeaderStatus(demand.MaterialRequisitionHeaderId);
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task CancelSplitDraft(CancelSplitDraftInput input)
        {
            var demand = await _demandRepository.GetAllIncluding(x => x.Lines)
                .FirstOrDefaultAsync(x => x.Id == input.DeliveryDemandId);
            if (demand == null)
            {
                throw new EntityNotFoundException(typeof(DeliveryDemand), input.DeliveryDemandId);
            }
            if (demand.Status != MaterialRequisitionStatuses.Draft)
            {
                throw new UserFriendlyException("只有草稿状态的配送需求可以撤销。");
            }

            demand.Status = MaterialRequisitionStatuses.Cancelled;
            await _demandRepository.UpdateAsync(demand);
            await RecalculateHeaderStatus(demand.MaterialRequisitionHeaderId);
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task CancelSplitDraftLine(CancelSplitDraftLineInput input)
        {
            var demandLine = await _demandLineRepository.GetAllIncluding(x => x.DeliveryDemand)
                .FirstOrDefaultAsync(x => x.Id == input.DeliveryDemandLineId);
            if (demandLine == null)
            {
                throw new EntityNotFoundException(typeof(DeliveryDemandLine), input.DeliveryDemandLineId);
            }
            if (demandLine.DeliveryDemand.Status != MaterialRequisitionStatuses.Draft)
            {
                throw new UserFriendlyException("只有草稿状态的配送需求明细可以撤销。");
            }

            var demandId = demandLine.DeliveryDemandId;
            var headerId = demandLine.DeliveryDemand.MaterialRequisitionHeaderId;
            await _demandLineRepository.DeleteAsync(demandLine);
            await CurrentUnitOfWork.SaveChangesAsync();

            var hasLines = await _demandLineRepository.GetAll()
                .AnyAsync(x => x.DeliveryDemandId == demandId);
            if (!hasLines)
            {
                var demand = await _demandRepository.GetAsync(demandId);
                demand.Status = MaterialRequisitionStatuses.Cancelled;
                await _demandRepository.UpdateAsync(demand);
            }

            await RecalculateHeaderStatus(headerId);
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        public async Task<SapMaterialRequisitionResponseDto> SyncFromSap(SapMaterialRequisitionRequestDto input)
        {
            try
            {
                ValidateSapInput(input);
                var rows = input.IS_MESSAGE.IT_DATA;
                var first = rows.First();
                var requisitionNo = Required(first.LLSQD, "LLSQD");
                var header = await _headerRepository.GetAllIncluding(x => x.Lines)
                    .FirstOrDefaultAsync(x => x.RequisitionNo == requisitionNo);

                var isNewHeader = header == null;
                if (header == null)
                {
                    header = new MaterialRequisitionHeader
                    {
                        RequisitionNo = requisitionNo
                    };
                    MapHeader(header, first, input.IS_BASEINFO);
                    await _headerRepository.InsertAsync(header);
                    await CurrentUnitOfWork.SaveChangesAsync();
                }
                else
                {
                    MapHeader(header, first, input.IS_BASEINFO);
                }

                foreach (var row in rows)
                {
                    var lineNo = Required(row.LLPOS, "LLPOS");
                    var line = header.Lines.FirstOrDefault(x => x.LineNo == lineNo);
                    if (line == null)
                    {
                        line = await _lineRepository.FirstOrDefaultAsync(x => x.RequisitionNo == requisitionNo && x.LineNo == lineNo);
                    }
                    if (line == null)
                    {
                        line = new MaterialRequisitionLine
                        {
                            MaterialRequisitionHeaderId = header.Id,
                            RequisitionNo = requisitionNo,
                            LineNo = lineNo
                        };
                        await _lineRepository.InsertAsync(line);
                    }

                    MapLine(line, row);
                }

                if (!isNewHeader)
                {
                    await _headerRepository.UpdateAsync(header);
                }
                await CurrentUnitOfWork.SaveChangesAsync();
                await RecalculateHeaderStatus(header.Id);
                await CurrentUnitOfWork.SaveChangesAsync();

                return BuildSapResponse(input, "S", "成功");
            }
            catch (Exception ex)
            {
                return BuildSapResponse(input, "E", ex.Message);
            }
        }

        public SapMaterialRequisitionRequestDto GenerateSample()
        {
            var now = Clock.Now;
            var requisitionNo = now.ToString("MMddHHmmss");
            return new SapMaterialRequisitionRequestDto
            {
                IS_BASEINFO = new SapBaseInfoDto
                {
                    MSGID = Guid.NewGuid().ToString("N"),
                    LANGUAGE = 1,
                    S_SYSTEM_CODE = "ERP",
                    S_SYSTEM_NAME = "ERP",
                    SERVICENAME = "SI_LM_MaterialRequisition_OUT_Syn",
                    SENDTIME = long.Parse(now.ToString("yyyyMMddHHmmss")),
                    T_SYSTEMLIST = new SapTargetSystemDto
                    {
                        T_SYSTEM_CODE = "WCT",
                        T_SYSTEM_NAME = "WCT"
                    }
                },
                IS_MESSAGE = new SapMessageDto
                {
                    IT_DATA = new List<SapMaterialRequisitionLineDto>
                    {
                        new SapMaterialRequisitionLineDto
                        {
                            WERKS1 = "2000",
                            WERKS2 = "2601",
                            LLSQD = requisitionNo,
                            LLPOS = "00001",
                            MATNR = "1100000021",
                            MENGE = "100.000",
                            MEINS = "TO",
                            CHARG = "",
                            RZZL = "",
                            UMLGO = "3108",
                            LLSQRQ = now.ToString("yyyyMMdd"),
                            SFPS = "Y",
                            ZPSFS = "多次配送",
                            PSRQ = now.AddDays(2).ToString("yyyyMMdd"),
                            ZPSSJD = "上午",
                            PERNR = "50000068",
                            TELNR = "13612345678",
                            BEIZHU = "自动生成测试领料行1",
                            SOBKZ = "Q"
                        },
                        new SapMaterialRequisitionLineDto
                        {
                            WERKS1 = "2000",
                            WERKS2 = "2601",
                            LLSQD = requisitionNo,
                            LLPOS = "00002",
                            MATNR = "20000002",
                            MENGE = "45.000",
                            MEINS = "TO",
                            CHARG = "",
                            RZZL = "",
                            UMLGO = "3108",
                            LLSQRQ = now.ToString("yyyyMMdd"),
                            SFPS = "Y",
                            ZPSFS = "多次配送",
                            PSRQ = now.AddDays(2).ToString("yyyyMMdd"),
                            ZPSSJD = "上午",
                            PERNR = "50000068",
                            TELNR = "13612345678",
                            BEIZHU = "自动生成测试领料行2",
                            SOBKZ = "Q"
                        }
                    }
                }
            };
        }

        private async Task<DeliveryDemandDto> SaveSplit(SaveSplitInput input, string status)
        {
            ValidateSplitInput(input);
            var header = await GetHeader(input.MaterialRequisitionHeaderId);
            if (!header.IsDeliveryRequired || header.SplitStatus == MaterialRequisitionStatuses.NoProcess)
            {
                throw new UserFriendlyException("该领料单不需要配送，不能拆解。");
            }

            var lines = await _lineRepository.GetAllListAsync(x => x.MaterialRequisitionHeaderId == header.Id);
            var inputLineIds = input.Lines.Where(x => x.DemandQuantity > 0).Select(x => x.MaterialRequisitionLineId).ToList();
            var selectedLines = lines.Where(x => inputLineIds.Contains(x.Id)).ToList();
            if (selectedLines.Count != inputLineIds.Count)
            {
                throw new UserFriendlyException("拆解行项目不存在。");
            }

            foreach (var lineInput in input.Lines.Where(x => x.DemandQuantity > 0))
            {
                var line = selectedLines.First(x => x.Id == lineInput.MaterialRequisitionLineId);
                var remaining = await GetRemainingQuantity(line.Id, input.DeliveryDemandId);
                if (lineInput.DemandQuantity > remaining)
                {
                    throw new UserFriendlyException("本次数量不能超过待拆数量。");
                }
            }

            DeliveryDemand demand;
            var isNewDemand = !input.DeliveryDemandId.HasValue;
            if (input.DeliveryDemandId.HasValue)
            {
                demand = await _demandRepository.GetAllIncluding(x => x.Lines)
                    .FirstOrDefaultAsync(x => x.Id == input.DeliveryDemandId.Value);
                if (demand == null)
                {
                    throw new EntityNotFoundException(typeof(DeliveryDemand), input.DeliveryDemandId.Value);
                }
                if (demand.MaterialRequisitionHeaderId != header.Id)
                {
                    throw new UserFriendlyException("草稿配送需求不属于当前领料单。");
                }
                if (demand.Status != MaterialRequisitionStatuses.Draft)
                {
                    throw new UserFriendlyException("只有草稿状态的配送需求可以修改。");
                }
            }
            else
            {
                demand = new DeliveryDemand
                {
                    MaterialRequisitionHeaderId = header.Id,
                    Header = header,
                    DemandNo = GenerateDemandNo(),
                    RequisitionNo = header.RequisitionNo
                };
            }

            demand.ReceiptStorageLocation = Required(input.ReceiptStorageLocation, "收货库存地点");
            demand.DeliveryDate = input.DeliveryDate.Date;
            demand.DeliveryTimeSlot = Required(input.DeliveryTimeSlot, "配送时段");
            demand.LastDeliveryDate = input.LastDeliveryDate.Date;
            demand.Status = status;

            if (isNewDemand)
            {
                await _demandRepository.InsertAsync(demand);
            }
            else
            {
                await _demandRepository.UpdateAsync(demand);
            }
            await CurrentUnitOfWork.SaveChangesAsync();

            if (input.DeliveryDemandId.HasValue)
            {
                await _demandLineRepository.DeleteAsync(x => x.DeliveryDemandId == demand.Id);
                await CurrentUnitOfWork.SaveChangesAsync();
            }

            foreach (var lineInput in input.Lines.Where(x => x.DemandQuantity > 0))
            {
                var line = selectedLines.First(x => x.Id == lineInput.MaterialRequisitionLineId);
                await _demandLineRepository.InsertAsync(new DeliveryDemandLine
                {
                    DeliveryDemandId = demand.Id,
                    DeliveryDemand = demand,
                    MaterialRequisitionLineId = line.Id,
                    MaterialRequisitionLine = line,
                    RequisitionNo = line.RequisitionNo,
                    LineNo = line.LineNo,
                    DemandQuantity = lineInput.DemandQuantity
                });
            }

            await CurrentUnitOfWork.SaveChangesAsync();
            await RecalculateHeaderStatus(header.Id);
            await CurrentUnitOfWork.SaveChangesAsync();

            var saved = await _demandRepository.GetAllIncluding(x => x.Lines)
                .FirstAsync(x => x.Id == demand.Id);
            return (await MapDemands(new List<DeliveryDemand> { saved })).First();
        }

        private async Task<MaterialRequisitionHeader> GetHeader(long id)
        {
            var header = await _headerRepository.GetAllIncluding(x => x.Lines).FirstOrDefaultAsync(x => x.Id == id);
            if (header == null)
            {
                throw new EntityNotFoundException(typeof(MaterialRequisitionHeader), id);
            }

            return header;
        }

        private async Task<List<MaterialRequisitionListDto>> MapHeaders(List<MaterialRequisitionHeader> headers)
        {
            var headerIds = headers.Select(x => x.Id).ToList();
            var lineIds = headers.SelectMany(x => x.Lines).Select(x => x.Id).ToList();
            var splitQuantities = await GetSplitQuantities(lineIds);

            return headers.Select(header => new MaterialRequisitionListDto
            {
                Id = header.Id,
                RequisitionNo = header.RequisitionNo,
                RequisitionFactory = header.RequisitionFactory,
                IssueFactory = header.IssueFactory,
                RequisitionDate = header.RequisitionDate,
                IsDeliveryRequired = header.IsDeliveryRequired,
                DeliveryMethod = header.DeliveryMethod,
                ApplicantNo = header.ApplicantNo,
                ApplicantPhone = header.ApplicantPhone,
                SpecialStock = header.SpecialStock,
                SplitStatus = header.SplitStatus,
                SourceConfirmStatus = header.SourceConfirmStatus,
                Lines = header.Lines.OrderBy(x => x.LineNo).Select(line =>
                {
                    var split = splitQuantities.ContainsKey(line.Id) ? splitQuantities[line.Id] : 0m;
                    return new MaterialRequisitionLineDto
                    {
                        Id = line.Id,
                        MaterialRequisitionHeaderId = line.MaterialRequisitionHeaderId,
                        RequisitionNo = line.RequisitionNo,
                        LineNo = line.LineNo,
                        MaterialNo = line.MaterialNo,
                        Quantity = line.Quantity,
                        SplitQuantity = split,
                        RemainingQuantity = line.Quantity - split,
                        Unit = line.Unit,
                        Batch = line.Batch,
                        CertificationType = line.CertificationType,
                        ReceiptStorageLocation = line.ReceiptStorageLocation,
                        RequiredDeliveryDate = line.RequiredDeliveryDate,
                        RequiredDeliveryTimeSlot = line.RequiredDeliveryTimeSlot,
                        SpecialStock = line.SpecialStock,
                        Remark = line.Remark
                    };
                }).ToList()
            }).ToList();
        }

        private async Task<List<DeliveryDemandDto>> MapDemands(List<DeliveryDemand> demands)
        {
            var lineIds = demands.SelectMany(x => x.Lines).Select(x => x.MaterialRequisitionLineId).Distinct().ToList();
            var materialLines = await _lineRepository.GetAllListAsync(x => lineIds.Contains(x.Id));

            return demands.Select(demand => new DeliveryDemandDto
            {
                Id = demand.Id,
                DemandNo = demand.DemandNo,
                RequisitionNo = demand.RequisitionNo,
                ReceiptStorageLocation = demand.ReceiptStorageLocation,
                DeliveryDate = demand.DeliveryDate,
                DeliveryTimeSlot = demand.DeliveryTimeSlot,
                LastDeliveryDate = demand.LastDeliveryDate,
                Status = demand.Status,
                Lines = demand.Lines.OrderBy(x => x.LineNo).Select(line =>
                {
                    var materialLine = materialLines.FirstOrDefault(x => x.Id == line.MaterialRequisitionLineId);
                    return new DeliveryDemandLineDto
                    {
                        Id = line.Id,
                        DeliveryDemandId = line.DeliveryDemandId,
                        MaterialRequisitionLineId = line.MaterialRequisitionLineId,
                        RequisitionNo = line.RequisitionNo,
                        LineNo = line.LineNo,
                        MaterialNo = materialLine == null ? "" : materialLine.MaterialNo,
                        Unit = materialLine == null ? "" : materialLine.Unit,
                        DemandQuantity = line.DemandQuantity
                    };
                }).ToList()
            }).ToList();
        }

        private async Task<Dictionary<long, decimal>> GetSplitQuantities(List<long> lineIds)
        {
            if (lineIds.Count == 0)
            {
                return new Dictionary<long, decimal>();
            }

            return await _demandLineRepository.GetAll()
                .Where(x => lineIds.Contains(x.MaterialRequisitionLineId))
                .Where(x => x.DeliveryDemand.Status == MaterialRequisitionStatuses.Confirmed)
                .GroupBy(x => x.MaterialRequisitionLineId)
                .Select(x => new { LineId = x.Key, Quantity = x.Sum(l => l.DemandQuantity) })
                .ToDictionaryAsync(x => x.LineId, x => x.Quantity);
        }

        private async Task<decimal> GetRemainingQuantity(long materialRequisitionLineId, long? ignoredDemandId)
        {
            var line = await _lineRepository.GetAsync(materialRequisitionLineId);
            var query = _demandLineRepository.GetAll()
                .Where(x => x.MaterialRequisitionLineId == materialRequisitionLineId)
                .Where(x => x.DeliveryDemand.Status == MaterialRequisitionStatuses.Confirmed);
            if (ignoredDemandId.HasValue)
            {
                query = query.Where(x => x.DeliveryDemandId != ignoredDemandId.Value);
            }

            var used = await query.SumAsync(x => (decimal?)x.DemandQuantity) ?? 0m;
            return line.Quantity - used;
        }

        private async Task RecalculateHeaderStatus(long headerId)
        {
            var header = await GetHeader(headerId);
            if (!header.IsDeliveryRequired)
            {
                header.SplitStatus = MaterialRequisitionStatuses.NoProcess;
                header.SourceConfirmStatus = MaterialRequisitionStatuses.NoProcess;
                await _headerRepository.UpdateAsync(header);
                return;
            }

            var lineIds = header.Lines.Select(x => x.Id).ToList();
            var splitQuantities = await GetSplitQuantities(lineIds);
            var total = header.Lines.Sum(x => x.Quantity);
            var split = splitQuantities.Values.Sum();

            if (split <= 0)
            {
                header.SplitStatus = MaterialRequisitionStatuses.NotSplit;
            }
            else if (split >= total)
            {
                header.SplitStatus = MaterialRequisitionStatuses.FullySplit;
            }
            else
            {
                header.SplitStatus = MaterialRequisitionStatuses.PartiallySplit;
            }

            header.SourceConfirmStatus = MaterialRequisitionStatuses.NotConfirmed;
            await _headerRepository.UpdateAsync(header);
        }

        private void ValidateSplitInput(SaveSplitInput input)
        {
            if (input == null)
            {
                throw new UserFriendlyException("拆解信息不能为空。");
            }
            if (input.LastDeliveryDate.Date < input.DeliveryDate.Date)
            {
                throw new UserFriendlyException("最后配送日期不能早于配送日期。");
            }
            if (input.Lines == null || !input.Lines.Any(x => x.DemandQuantity > 0))
            {
                throw new UserFriendlyException("本次数量必须大于 0。");
            }
        }

        private void ValidateSapInput(SapMaterialRequisitionRequestDto input)
        {
            if (input == null || input.IS_MESSAGE == null || input.IS_MESSAGE.IT_DATA == null || input.IS_MESSAGE.IT_DATA.Count == 0)
            {
                throw new UserFriendlyException("IT_DATA不能为空。");
            }

            foreach (var row in input.IS_MESSAGE.IT_DATA)
            {
                Required(row.WERKS1, "WERKS1");
                Required(row.LLSQD, "LLSQD");
                Required(row.LLPOS, "LLPOS");
                Required(row.MATNR, "MATNR");
                if (ParseDecimal(row.MENGE) <= 0)
                {
                    throw new UserFriendlyException("MENGE必须大于0。");
                }
            }

            var requisitionNos = input.IS_MESSAGE.IT_DATA.Select(x => x.LLSQD).Distinct().Count();
            if (requisitionNos > 1)
            {
                throw new UserFriendlyException("一次同步只允许一个领料单号。");
            }
        }

        private void MapHeader(MaterialRequisitionHeader header, SapMaterialRequisitionLineDto row, SapBaseInfoDto baseInfo)
        {
            header.RequisitionFactory = Required(row.WERKS1, "WERKS1");
            header.IssueFactory = row.WERKS2;
            header.RequisitionDate = ParseDate(row.LLSQRQ);
            header.IsDeliveryRequired = IsDeliveryRequired(row.SFPS);
            header.DeliveryMethod = row.ZPSFS;
            header.ApplicantNo = row.PERNR;
            header.ApplicantPhone = row.TELNR;
            header.SpecialStock = row.SOBKZ;
            header.SapMessageId = baseInfo == null ? null : baseInfo.MSGID;
            if (!header.IsDeliveryRequired || IsSelfPickup(row.ZPSFS))
            {
                header.SplitStatus = MaterialRequisitionStatuses.NoProcess;
                header.SourceConfirmStatus = MaterialRequisitionStatuses.NoProcess;
            }
        }

        private void MapLine(MaterialRequisitionLine line, SapMaterialRequisitionLineDto row)
        {
            line.MaterialNo = Required(row.MATNR, "MATNR");
            line.Quantity = ParseDecimal(row.MENGE);
            line.Unit = row.MEINS;
            line.Batch = row.CHARG;
            line.CertificationType = row.RZZL;
            line.ReceiptStorageLocation = row.UMLGO;
            line.RequiredDeliveryDate = ParseDate(row.PSRQ);
            line.RequiredDeliveryTimeSlot = row.ZPSSJD;
            line.SpecialStock = row.SOBKZ;
            line.Remark = row.BEIZHU;
        }

        private SapMaterialRequisitionResponseDto BuildSapResponse(SapMaterialRequisitionRequestDto request, string state, string message)
        {
            return new SapMaterialRequisitionResponseDto
            {
                ES_BASEINFO = new SapResponseBaseInfoDto
                {
                    MSGID = Guid.NewGuid().ToString("N"),
                    LANGUAGE = 1,
                    T_SYSTEM = "ERP",
                    SERVICENAME = "SI_WCT_MaterialRequisition_IN_Syn",
                    SENDTIME = long.Parse(Clock.Now.ToString("yyyyMMddHHmmss")),
                    STATE = state,
                    SHIORTLOG = message
                },
                ES_MESSAGE = new SapResponseMessageDto
                {
                    TYPE = state,
                    MESSAGE = message
                }
            };
        }

        private string GenerateDemandNo()
        {
            return "DELREQ-" + Clock.Now.ToString("yyyyMMdd-HHmmssfff");
        }

        private static string Required(string value, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new UserFriendlyException(fieldName + "不能为空。");
            }

            return value.Trim();
        }

        private static bool IsDeliveryRequired(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return false;
            }

            var normalized = value.Trim().ToUpperInvariant();
            return normalized == "Y" || normalized == "1" || normalized == "是" || normalized == "X";
        }

        private static bool IsSelfPickup(string value)
        {
            return !string.IsNullOrWhiteSpace(value) && value.Contains("自行");
        }

        private static DateTime? ParseDate(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            DateTime parsed;
            var formats = new[] { "yyyyMMdd", "yyyy-MM-dd", "yyyy.MM.dd" };
            if (DateTime.TryParseExact(value.Trim(), formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsed))
            {
                return parsed.Date;
            }

            if (DateTime.TryParse(value, out parsed))
            {
                return parsed.Date;
            }

            throw new UserFriendlyException("日期格式不正确：" + value);
        }

        private static decimal ParseDecimal(string value)
        {
            decimal parsed;
            if (!decimal.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out parsed))
            {
                throw new UserFriendlyException("数量格式不正确：" + value);
            }

            return parsed;
        }
    }
}
