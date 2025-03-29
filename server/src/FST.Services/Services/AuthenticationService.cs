using FST.Services.DTOs.Authentication;
using FST.Services.Interfaces;
using FST.Shared.Constants;
using FST.Shared.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace FST.Services.Services;

public class AuthenticationService(IConfiguration configuration, IHttpClientFactory httpClientFactory, IUserService userService) : IAuthenticationService
{
    public readonly HttpClient httpClient = httpClientFactory.CreateClient(AuthenticationConstants.KeycloakHttpClient);

    public Task<AuthTokensDto> LoginAsync(LoginDto login)
    {
        var clientId = configuration["Keycloak:ClientId"];
        var clientSecret = configuration["Keycloak:ClientSecret"];
        var tokenUrl = configuration["Keycloak:TokenUrl"];

        if (string.IsNullOrWhiteSpace(clientId) ||
            string.IsNullOrWhiteSpace(clientSecret) ||
            string.IsNullOrWhiteSpace(tokenUrl)) throw new Exception("Missing Keycloak configuration");

        var body = new Dictionary<string, string>
        {
            { "client_id", clientId },
            { "client_secret", clientSecret },
            { "grant_type", "password" },
            { "username", login.Username },
            { "password", login.Password }
        };
        
        return httpClient.PostEncodedAsync<AuthTokensDto>(tokenUrl, body);
    }

    public void StoreTokens(AuthTokensDto authTokens, HttpContext httpContext)
    {
        httpContext.Response.Cookies.Append(AuthenticationConstants.AccessCookie, authTokens.Access, GetCookieOptions(true));
        httpContext.Response.Cookies.Append(AuthenticationConstants.RefreshCookie, authTokens.Access, GetCookieOptions(false));
    }

    public void DeleteTokens(HttpContext httpContext)
    {
        httpContext.Response.Cookies.Delete(AuthenticationConstants.AccessCookie);
        httpContext.Response.Cookies.Delete(AuthenticationConstants.RefreshCookie);
    }

    private CookieOptions GetCookieOptions(bool isAccess)
    {
        return new CookieOptions
        {
            Expires = isAccess ? DateTime.UtcNow.AddMinutes(5) : DateTime.UtcNow.AddDays(7),
            HttpOnly = true,
            IsEssential = true,
            Secure = true,
            SameSite = SameSiteMode.None,
        };
    }
}
