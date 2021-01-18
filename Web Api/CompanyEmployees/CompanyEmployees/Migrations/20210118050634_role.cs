using Microsoft.EntityFrameworkCore.Migrations;

namespace CompanyEmployees.Migrations
{
    public partial class role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3526db77-bb02-403c-87ef-f18f3f534c46");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "876e3af0-294c-4551-bd26-4bf60004c8ff");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c73f0648-be64-4f06-ac1b-af992b661d2a", "0116e184-33d4-4573-9b23-696078381418", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c8235955-0518-425d-9d42-3d2cc910180e", "d066a7be-7e76-4ed8-a396-b2577832d267", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                values: new object[] { "3526db77-bb02-403c-87ef-f18f3f534c46", "68ce237c-776a-4cf2-87de-92bef2dff5fd", "Viewer", "VIEWER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "876e3af0-294c-4551-bd26-4bf60004c8ff", "769a1c85-eb7c-4713-b8c1-e76908df44a9", "Administrator", "ADMINISTRATOR" });
        }
    }
}
