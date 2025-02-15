using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FST.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(IHttpContextAccessor httpContextAccessor) : ControllerBase
{
    [HttpGet("Me")]
    [Authorize]
    public ActionResult GetClaims()
    {
        var claimsPrincipal = httpContextAccessor.HttpContext?.User;
        return Ok(claimsPrincipal?.Claims.ToDictionary(c => c.Type, c => c.Value));
    }
}
