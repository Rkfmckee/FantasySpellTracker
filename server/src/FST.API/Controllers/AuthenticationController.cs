using AutoMapper;
using FST.API.ViewModels.Authentication;
using FST.Services.DTOs.Authentication;
using FST.Services.Interfaces;
using FST.Shared.Constants;
using FST.Shared.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FST.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(IMapper mapper, IAuthenticationService authenticationService, IHttpContextAccessor httpContextAccessor) : BaseController
{
    [HttpPost("Login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> Login(LoginViewModel login)
    {
        var loginData = mapper.Map<LoginDto>(login);

        try
        {
            var authTokens = await authenticationService.LoginAsync(loginData);
            if (authTokens == null) return Problem("There was a problem, please try again");

            authenticationService.StoreTokens(authTokens, HttpContext);
        }
        catch (Exception ex)
        {
            return Problem(ex.Message);
        }

        return Ok();
    }

    [Authorize]
    [HttpGet("Logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Logout()
    {
        var errorMessage = "There was a problem, please try again";
        return Ok(await authenticationService.LogoutAsync());
    }

    [Authorize]
    [HttpGet("UserName")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult GetUserName()
    {
        var errorMessage = "Not logged in";
        return OkOrProblem(httpContextAccessor.HttpContext?.User.GetValue(ClaimConstants.UserName), errorMessage);
    }
}
