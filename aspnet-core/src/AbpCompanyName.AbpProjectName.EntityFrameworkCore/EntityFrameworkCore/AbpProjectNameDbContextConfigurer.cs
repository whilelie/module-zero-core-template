using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore;

public static class AbpProjectNameDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<AbpProjectNameDbContext> builder, string connectionString)
    {
        builder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    }

    public static void Configure(DbContextOptionsBuilder<AbpProjectNameDbContext> builder, DbConnection connection)
    {
        builder.UseMySql(connection, ServerVersion.AutoDetect(connection.ConnectionString));
    }
}
