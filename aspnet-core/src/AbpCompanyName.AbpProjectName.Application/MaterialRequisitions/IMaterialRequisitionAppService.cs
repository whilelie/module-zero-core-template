using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.MaterialRequisitions.Dto;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public interface IMaterialRequisitionAppService : IApplicationService
    {
        Task<PagedResultDto<MaterialRequisitionListDto>> GetAll(GetMaterialRequisitionsInput input);
        Task<MaterialRequisitionSplitDto> GetForSplit(EntityDto<long> input);
        Task<DeliveryDemandDto> SaveSplitDraft(SaveSplitInput input);
        Task<DeliveryDemandDto> ConfirmSplit(SaveSplitInput input);
        Task ConfirmSplitDraft(CancelSplitDraftInput input);
        Task CancelSplitDraft(CancelSplitDraftInput input);
        Task CancelSplitDraftLine(CancelSplitDraftLineInput input);
        Task<SapMaterialRequisitionResponseDto> SyncFromSap(SapMaterialRequisitionRequestDto input);
        SapMaterialRequisitionRequestDto GenerateSample();
    }
}
