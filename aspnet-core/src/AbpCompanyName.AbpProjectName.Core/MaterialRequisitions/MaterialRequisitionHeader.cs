using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.MaterialRequisitions
{
    public class MaterialRequisitionHeader : AuditedEntity<long>
    {
        [Required]
        [MaxLength(20)]
        public string RequisitionNo { get; set; }

        [Required]
        [MaxLength(4)]
        public string RequisitionFactory { get; set; }

        [MaxLength(4)]
        public string IssueFactory { get; set; }

        public DateTime? RequisitionDate { get; set; }

        public bool IsDeliveryRequired { get; set; }

        [MaxLength(20)]
        public string DeliveryMethod { get; set; }

        [MaxLength(20)]
        public string ApplicantNo { get; set; }

        [MaxLength(50)]
        public string ApplicantPhone { get; set; }

        [MaxLength(1)]
        public string SpecialStock { get; set; }

        [Required]
        [MaxLength(20)]
        public string SplitStatus { get; set; }

        [Required]
        [MaxLength(20)]
        public string SourceConfirmStatus { get; set; }

        [MaxLength(64)]
        public string SapMessageId { get; set; }

        public virtual ICollection<MaterialRequisitionLine> Lines { get; set; }

        public virtual ICollection<DeliveryDemand> DeliveryDemands { get; set; }

        public MaterialRequisitionHeader()
        {
            Lines = new List<MaterialRequisitionLine>();
            DeliveryDemands = new List<DeliveryDemand>();
            SplitStatus = MaterialRequisitionStatuses.NotSplit;
            SourceConfirmStatus = MaterialRequisitionStatuses.NotConfirmed;
        }
    }
}
