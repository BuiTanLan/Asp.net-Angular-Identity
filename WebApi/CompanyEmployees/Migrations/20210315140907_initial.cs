using Microsoft.EntityFrameworkCore.Migrations;

namespace CompanyEmployees.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c73f0648-be64-4f06-ac1b-af992b661d2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c8235955-0518-425d-9d42-3d2cc910180e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c68f64f6-58c9-44ee-bbf0-a3c4bc371a02", "0e2c8a48-49be-43ba-83b7-732da809115e", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "6d86cc5f-6a4f-4267-9205-17f8c6d2f996", "9fb3a50f-59a1-4dd2-8603-39cd76c2c792", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6d86cc5f-6a4f-4267-9205-17f8c6d2f996");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c68f64f6-58c9-44ee-bbf0-a3c4bc371a02");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c73f0648-be64-4f06-ac1b-af992b661d2a", "0116e184-33d4-4573-9b23-696078381418", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c8235955-0518-425d-9d42-3d2cc910180e", "d066a7be-7e76-4ed8-a396-b2577832d267", "Administrator", "ADMINISTRATOR" });
        }
    }
}
