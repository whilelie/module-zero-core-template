using Abp.Zero.EntityFrameworkCore;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using AbpCompanyName.AbpProjectName.MaterialRequisitions;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore;

public class AbpProjectNameDbContext : AbpZeroDbContext<Tenant, Role, User, AbpProjectNameDbContext>
{
    public DbSet<MaterialRequisitionHeader> MaterialRequisitionHeaders { get; set; }

    public DbSet<MaterialRequisitionLine> MaterialRequisitionLines { get; set; }

    public DbSet<DeliveryDemand> DeliveryDemands { get; set; }

    public DbSet<DeliveryDemandLine> DeliveryDemandLines { get; set; }

    public AbpProjectNameDbContext(DbContextOptions<AbpProjectNameDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MaterialRequisitionHeader>(b =>
        {
            b.ToTable("MaterialRequisitionHeaders");
            b.HasIndex(x => x.RequisitionNo).IsUnique();
            b.HasMany(x => x.Lines).WithOne(x => x.Header).HasForeignKey(x => x.MaterialRequisitionHeaderId);
            b.HasMany(x => x.DeliveryDemands).WithOne(x => x.Header).HasForeignKey(x => x.MaterialRequisitionHeaderId);
        });

        modelBuilder.Entity<MaterialRequisitionLine>(b =>
        {
            b.ToTable("MaterialRequisitionLines");
            b.HasIndex(x => new { x.RequisitionNo, x.LineNo }).IsUnique();
            b.Property(x => x.Quantity).HasColumnType("decimal(18,3)");
            b.HasMany(x => x.DeliveryDemandLines).WithOne(x => x.MaterialRequisitionLine).HasForeignKey(x => x.MaterialRequisitionLineId);
        });

        modelBuilder.Entity<DeliveryDemand>(b =>
        {
            b.ToTable("DeliveryDemands");
            b.HasIndex(x => x.DemandNo).IsUnique();
            b.HasIndex(x => x.RequisitionNo);
            b.HasMany(x => x.Lines).WithOne(x => x.DeliveryDemand).HasForeignKey(x => x.DeliveryDemandId);
        });

        modelBuilder.Entity<DeliveryDemandLine>(b =>
        {
            b.ToTable("DeliveryDemandLines");
            b.HasIndex(x => new { x.RequisitionNo, x.LineNo });
            b.Property(x => x.DemandQuantity).HasColumnType("decimal(18,3)");
        });
    }
}
