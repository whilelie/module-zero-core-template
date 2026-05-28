using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public class DeliveryDemand : AuditedEntity<long>
    {
        public long MaterialRequisitionHeaderId { get; set; }

        [ForeignKey(nameof(MaterialRequisitionHeaderId))]
        public virtual MaterialRequisitionHeader Header { get; set; }

        [Required]
        [MaxLength(30)]
        public string DemandNo { get; set; }

        [Required]
        [MaxLength(20)]
        public string RequisitionNo { get; set; }

        [Required]
        [MaxLength(10)]
        public string ReceiptStorageLocation { get; set; }

        public DateTime DeliveryDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string DeliveryTimeSlot { get; set; }

        public DateTime LastDeliveryDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        public virtual ICollection<DeliveryDemandLine> Lines { get; set; }

        public DeliveryDemand()
        {
            Lines = new List<DeliveryDemandLine>();
            Status = MaterialRequisitionStatuses.Draft;
        }
    }
}
