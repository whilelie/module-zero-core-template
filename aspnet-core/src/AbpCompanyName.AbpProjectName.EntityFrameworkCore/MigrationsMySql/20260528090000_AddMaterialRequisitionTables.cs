using System;
using AbpCompanyName.AbpProjectName.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AbpCompanyName.AbpProjectName.MigrationsMySql
{
    [DbContext(typeof(AbpProjectNameDbContext))]
    [Migration("20260528090000_AddMaterialRequisitionTables")]
    public partial class AddMaterialRequisitionTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaterialRequisitionHeaders",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    RequisitionNo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequisitionFactory = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IssueFactory = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequisitionDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeliveryRequired = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DeliveryMethod = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ApplicantNo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ApplicantPhone = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SpecialStock = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SplitStatus = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SourceConfirmStatus = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SapMessageId = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreationTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialRequisitionHeaders", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DeliveryDemands",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MaterialRequisitionHeaderId = table.Column<long>(type: "bigint", nullable: false),
                    DemandNo = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequisitionNo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReceiptStorageLocation = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DeliveryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeliveryTimeSlot = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastDeliveryDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreationTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDemands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryDemands_MaterialRequisitionHeaders_MaterialRequisitionHeaderId",
                        column: x => x.MaterialRequisitionHeaderId,
                        principalTable: "MaterialRequisitionHeaders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MaterialRequisitionLines",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    MaterialRequisitionHeaderId = table.Column<long>(type: "bigint", nullable: false),
                    RequisitionNo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LineNo = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaterialNo = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Quantity = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    Unit = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Batch = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CertificationType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ReceiptStorageLocation = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RequiredDeliveryDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    RequiredDeliveryTimeSlot = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SpecialStock = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Remark = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreationTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialRequisitionLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MaterialRequisitionLines_MaterialRequisitionHeaders_MaterialRequisitionHeaderId",
                        column: x => x.MaterialRequisitionHeaderId,
                        principalTable: "MaterialRequisitionHeaders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DeliveryDemandLines",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DeliveryDemandId = table.Column<long>(type: "bigint", nullable: false),
                    MaterialRequisitionLineId = table.Column<long>(type: "bigint", nullable: false),
                    RequisitionNo = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LineNo = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DemandQuantity = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDemandLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeliveryDemandLines_DeliveryDemands_DeliveryDemandId",
                        column: x => x.DeliveryDemandId,
                        principalTable: "DeliveryDemands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryDemandLines_MaterialRequisitionLines_MaterialRequisitionLineId",
                        column: x => x.MaterialRequisitionLineId,
                        principalTable: "MaterialRequisitionLines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemandLines_DeliveryDemandId",
                table: "DeliveryDemandLines",
                column: "DeliveryDemandId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemandLines_MaterialRequisitionLineId",
                table: "DeliveryDemandLines",
                column: "MaterialRequisitionLineId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemandLines_RequisitionNo_LineNo",
                table: "DeliveryDemandLines",
                columns: new[] { "RequisitionNo", "LineNo" });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemands_DemandNo",
                table: "DeliveryDemands",
                column: "DemandNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemands_MaterialRequisitionHeaderId",
                table: "DeliveryDemands",
                column: "MaterialRequisitionHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDemands_RequisitionNo",
                table: "DeliveryDemands",
                column: "RequisitionNo");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialRequisitionHeaders_RequisitionNo",
                table: "MaterialRequisitionHeaders",
                column: "RequisitionNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MaterialRequisitionLines_MaterialRequisitionHeaderId",
                table: "MaterialRequisitionLines",
                column: "MaterialRequisitionHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialRequisitionLines_RequisitionNo_LineNo",
                table: "MaterialRequisitionLines",
                columns: new[] { "RequisitionNo", "LineNo" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeliveryDemandLines");

            migrationBuilder.DropTable(
                name: "DeliveryDemands");

            migrationBuilder.DropTable(
                name: "MaterialRequisitionLines");

            migrationBuilder.DropTable(
                name: "MaterialRequisitionHeaders");
        }
    }
}
