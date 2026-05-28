using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public class DeliveryDemandLine : AuditedEntity<long>
    {
        public long DeliveryDemandId { get; set; }

        [ForeignKey(nameof(DeliveryDemandId))]
        public virtual DeliveryDemand DeliveryDemand { get; set; }

        public long MaterialRequisitionLineId { get; set; }

        [ForeignKey(nameof(MaterialRequisitionLineId))]
        public virtual MaterialRequisitionLine MaterialRequisitionLine { get; set; }

        [Required]
        [MaxLength(20)]
        public string RequisitionNo { get; set; }

        [Required]
        [MaxLength(10)]
        public string LineNo { get; set; }

        public decimal DemandQuantity { get; set; }
    }
}
