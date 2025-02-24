using FST.Services.DTOs.Authentication;

namespace FST.Services.Interfaces;
public interface IAuthenticationService
{
    Task<AuthTokensDto> LoginAsync(LoginDto login);
    Task<bool> LogoutAsync();
}