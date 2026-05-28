using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions.Dto
{
    public class GetMaterialRequisitionsInput : PagedAndSortedResultRequestDto
    {
        public string RequisitionFactory { get; set; }
        public string IssueFactory { get; set; }
        public string RequisitionNo { get; set; }
        public DateTime? RequisitionDate { get; set; }
        public bool? IsDeliveryRequired { get; set; }
        public string DeliveryMethod { get; set; }
        public string ApplicantNo { get; set; }
        public string SpecialStock { get; set; }
        public string MaterialNo { get; set; }
        public string SplitStatus { get; set; }
        public string SourceConfirmStatus { get; set; }
    }

    public class MaterialRequisitionListDto : EntityDto<long>
    {
        public string RequisitionNo { get; set; }
        public string RequisitionFactory { get; set; }
        public string IssueFactory { get; set; }
        public DateTime? RequisitionDate { get; set; }
        public bool IsDeliveryRequired { get; set; }
        public string DeliveryMethod { get; set; }
        public string ApplicantNo { get; set; }
        public string ApplicantPhone { get; set; }
        public string SpecialStock { get; set; }
        public string SplitStatus { get; set; }
        public string SourceConfirmStatus { get; set; }
        public List<MaterialRequisitionLineDto> Lines { get; set; }

        public MaterialRequisitionListDto()
        {
            Lines = new List<MaterialRequisitionLineDto>();
        }
    }

    public class MaterialRequisitionLineDto : EntityDto<long>
    {
        public long MaterialRequisitionHeaderId { get; set; }
        public string RequisitionNo { get; set; }
        public string LineNo { get; set; }
        public string MaterialNo { get; set; }
        public decimal Quantity { get; set; }
        public decimal SplitQuantity { get; set; }
        public decimal RemainingQuantity { get; set; }
        public string Unit { get; set; }
        public string Batch { get; set; }
        public string CertificationType { get; set; }
        public string ReceiptStorageLocation { get; set; }
        public DateTime? RequiredDeliveryDate { get; set; }
        public string RequiredDeliveryTimeSlot { get; set; }
        public string SpecialStock { get; set; }
        public string Remark { get; set; }
    }

    public class DeliveryDemandDto : EntityDto<long>
    {
        public string DemandNo { get; set; }
        public string RequisitionNo { get; set; }
        public string ReceiptStorageLocation { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string DeliveryTimeSlot { get; set; }
        public DateTime LastDeliveryDate { get; set; }
        public string Status { get; set; }
        public List<DeliveryDemandLineDto> Lines { get; set; }

        public DeliveryDemandDto()
        {
            Lines = new List<DeliveryDemandLineDto>();
        }
    }

    public class DeliveryDemandLineDto : EntityDto<long>
    {
        public long DeliveryDemandId { get; set; }
        public long MaterialRequisitionLineId { get; set; }
        public string RequisitionNo { get; set; }
        public string LineNo { get; set; }
        public string MaterialNo { get; set; }
        public string Unit { get; set; }
        public decimal DemandQuantity { get; set; }
    }

    public class MaterialRequisitionSplitDto
    {
        public MaterialRequisitionListDto Header { get; set; }
        public List<DeliveryDemandDto> ExistingDemands { get; set; }

        public MaterialRequisitionSplitDto()
        {
            ExistingDemands = new List<DeliveryDemandDto>();
        }
    }

    public class SaveSplitInput
    {
        public long? DeliveryDemandId { get; set; }
        public long MaterialRequisitionHeaderId { get; set; }
        public string ReceiptStorageLocation { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string DeliveryTimeSlot { get; set; }
        public DateTime LastDeliveryDate { get; set; }
        public List<SaveSplitLineInput> Lines { get; set; }

        public SaveSplitInput()
        {
            Lines = new List<SaveSplitLineInput>();
        }
    }

    public class SaveSplitLineInput
    {
        public long MaterialRequisitionLineId { get; set; }
        public decimal DemandQuantity { get; set; }
    }

    public class CancelSplitDraftInput
    {
        public long DeliveryDemandId { get; set; }
    }

    public class CancelSplitDraftLineInput
    {
        public long DeliveryDemandLineId { get; set; }
    }

    public class SapMaterialRequisitionRequestDto
    {
        public SapBaseInfoDto IS_BASEINFO { get; set; }
        public SapMessageDto IS_MESSAGE { get; set; }
    }

    public class SapBaseInfoDto
    {
        public string MSGID { get; set; }
        public int? LANGUAGE { get; set; }
        public string S_SYSTEM_CODE { get; set; }
        public string S_SYSTEM_NAME { get; set; }
        public string SERVICENAME { get; set; }
        public long? SENDTIME { get; set; }
        public SapTargetSystemDto T_SYSTEMLIST { get; set; }
    }

    public class SapTargetSystemDto
    {
        public string T_SYSTEM_CODE { get; set; }
        public string T_SYSTEM_NAME { get; set; }
    }

    public class SapMessageDto
    {
        public List<SapMaterialRequisitionLineDto> IT_DATA { get; set; }

        public SapMessageDto()
        {
            IT_DATA = new List<SapMaterialRequisitionLineDto>();
        }
    }

    public class SapMaterialRequisitionLineDto
    {
        public string WERKS1 { get; set; }
        public string WERKS2 { get; set; }
        public string LLSQD { get; set; }
        public string LLPOS { get; set; }
        public string MATNR { get; set; }
        public string MENGE { get; set; }
        public string MEINS { get; set; }
        public string CHARG { get; set; }
        public string RZZL { get; set; }
        public string UMLGO { get; set; }
        public string LLSQRQ { get; set; }
        public string SFPS { get; set; }
        public string ZPSFS { get; set; }
        public string PSRQ { get; set; }
        public string ZPSSJD { get; set; }
        public string PERNR { get; set; }
        public string TELNR { get; set; }
        public string BEIZHU { get; set; }
        public string SOBKZ { get; set; }
    }

    public class SapMaterialRequisitionResponseDto
    {
        public SapResponseBaseInfoDto ES_BASEINFO { get; set; }
        public SapResponseMessageDto ES_MESSAGE { get; set; }
    }

    public class SapResponseBaseInfoDto
    {
        public string MSGID { get; set; }
        public int LANGUAGE { get; set; }
        public string T_SYSTEM { get; set; }
        public string SERVICENAME { get; set; }
        public long SENDTIME { get; set; }
        public string STATE { get; set; }
        public string SHIORTLOG { get; set; }
    }

    public class SapResponseMessageDto
    {
        public string TYPE { get; set; }
        public string MESSAGE { get; set; }
    }
}
