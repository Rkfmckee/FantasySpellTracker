using FST.Services.DTOs.Authentication;
using Microsoft.AspNetCore.Http;

namespace FST.Services.Interfaces;
public interface IAuthenticationService
{
    Task<AuthTokensDto> LoginAsync(LoginDto login);
    Task<AuthTokensDto> RefreshAsync(string? refreshToken);
    void StoreTokens(AuthTokensDto authTokens, HttpContext httpContext);
    void DeleteTokens(HttpContext httpContext);
}