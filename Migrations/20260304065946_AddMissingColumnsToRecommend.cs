using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AesopFinal.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingColumnsToRecommend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Recommends",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Recommends",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SecondImageUrl",
                table: "Recommends",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Recommends");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Recommends");

            migrationBuilder.DropColumn(
                name: "SecondImageUrl",
                table: "Recommends");
        }
    }
}
