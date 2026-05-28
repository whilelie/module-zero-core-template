using AbpCompanyName.AbpProjectName.MaterialRequisitions;
using AbpCompanyName.AbpProjectName.MaterialRequisitions.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Web.Host.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    [Route("api/wct/material-requisitions")]
    public class MaterialRequisitionIntegrationController : Controller
    {
        private readonly IMaterialRequisitionAppService _materialRequisitionAppService;
        private readonly IConfiguration _configuration;

        public MaterialRequisitionIntegrationController(
            IMaterialRequisitionAppService materialRequisitionAppService,
            IConfiguration configuration)
        {
            _materialRequisitionAppService = materialRequisitionAppService;
            _configuration = configuration;
        }

        [HttpGet("sample")]
        public IActionResult Sample()
        {
            if (!IsBasicAuthValid())
            {
                return Unauthorized();
            }

            return SapJson(_materialRequisitionAppService.GenerateSample());
        }

        [HttpPost("sync")]
        public async Task<IActionResult> Sync([FromBody] SapMaterialRequisitionRequestDto input)
        {
            if (!IsBasicAuthValid())
            {
                return Unauthorized();
            }

            return SapJson(await _materialRequisitionAppService.SyncFromSap(input));
        }

        private JsonResult SapJson(object value)
        {
            return new JsonResult(value, new JsonSerializerOptions
            {
                PropertyNamingPolicy = null
            });
        }

        private bool IsBasicAuthValid()
        {
            var authorization = Request.Headers["Authorization"].ToString();
            if (string.IsNullOrWhiteSpace(authorization) ||
                !authorization.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            string decoded;
            try
            {
                decoded = Encoding.UTF8.GetString(Convert.FromBase64String(authorization.Substring("Basic ".Length).Trim()));
            }
            catch
            {
                return false;
            }

            var separatorIndex = decoded.IndexOf(':');
            if (separatorIndex <= 0)
            {
                return false;
            }

            var username = decoded.Substring(0, separatorIndex);
            var password = decoded.Substring(separatorIndex + 1);
            var expectedUsername = _configuration["WctIntegration:BasicAuth:Username"] ?? "sap";
            var expectedPassword = _configuration["WctIntegration:BasicAuth:Password"] ?? "123456";

            return string.Equals(username, expectedUsername, StringComparison.Ordinal) &&
                   string.Equals(password, expectedPassword, StringComparison.Ordinal);
        }
    }
}
