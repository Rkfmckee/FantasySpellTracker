using AutoMapper;
using FST.API.ViewModels.Authentication;
using FST.Services.DTOs.Authentication;
using FST.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FST.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController(IMapper mapper, IAuthenticationService authenticationService) : ControllerBase
{
    [HttpPost("Login")]
    [ProducesResponseType(typeof(AuthTokensViewModel), StatusCodes.Status200OK)]
    public async Task<ActionResult<AuthTokensViewModel>> Login(LoginViewModel login)
    {
        var loginData = mapper.Map<LoginDto>(login);
        return Ok(mapper.Map<AuthTokensViewModel>(await authenticationService.LoginAsync(loginData)));
    }
}
