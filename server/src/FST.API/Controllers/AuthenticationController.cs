using AutoMapper;
using FST.API.ViewModels.Authentication;
using FST.Services.DTOs.Authentication;
using FST.Services.Interfaces;
using FST.Shared.Constants;
using FST.Shared.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
            authenticationService.StoreTokens(authTokens, HttpContext);
        }
        catch (Exception ex)
        {
            var keycloakError = JsonConvert.DeserializeObject<KeycloakErrorDto>(ex.Message);
            if (string.IsNullOrWhiteSpace(keycloakError?.ErrorDescription)) throw;

            return Problem(keycloakError.ErrorDescription);
        }

        return Ok();
    }

    [HttpGet("Refresh")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> Refresh()
    {
        try
        {
            Request.Cookies.TryGetValue(AuthenticationConstants.RefreshCookie, out var refreshToken);
            var authTokens = await authenticationService.RefreshAsync(refreshToken);
            authenticationService.StoreTokens(authTokens, HttpContext);
        }
        catch (Exception)
        {
            return Unauthorized();
        }

        return Ok();
    }

    [HttpGet("Logout")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult Logout()
    {
        authenticationService.DeleteTokens(HttpContext);
        return Ok();
    }

    [Authorize]
    [HttpGet("User")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult GetUser()
    {
        var userName = httpContextAccessor.HttpContext?.User.GetValue(ClaimConstants.UserName);
        if (string.IsNullOrWhiteSpace(userName)) return Unauthorized();

        return Ok(new UserViewModel(userName));
    }
}
