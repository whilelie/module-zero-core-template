using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public class MaterialRequisitionLine : AuditedEntity<long>
    {
        public long MaterialRequisitionHeaderId { get; set; }

        [ForeignKey(nameof(MaterialRequisitionHeaderId))]
        public virtual MaterialRequisitionHeader Header { get; set; }

        [Required]
        [MaxLength(20)]
        public string RequisitionNo { get; set; }

        [Required]
        [MaxLength(10)]
        public string LineNo { get; set; }

        [Required]
        [MaxLength(40)]
        public string MaterialNo { get; set; }

        public decimal Quantity { get; set; }

        [MaxLength(10)]
        public string Unit { get; set; }

        [MaxLength(20)]
        public string Batch { get; set; }

        [MaxLength(50)]
        public string CertificationType { get; set; }

        [MaxLength(10)]
        public string ReceiptStorageLocation { get; set; }

        public System.DateTime? RequiredDeliveryDate { get; set; }

        [MaxLength(20)]
        public string RequiredDeliveryTimeSlot { get; set; }

        [MaxLength(1)]
        public string SpecialStock { get; set; }

        [MaxLength(500)]
        public string Remark { get; set; }

        public virtual ICollection<DeliveryDemandLine> DeliveryDemandLines { get; set; }

        public MaterialRequisitionLine()
        {
            DeliveryDemandLines = new List<DeliveryDemandLine>();
        }
    }
}
