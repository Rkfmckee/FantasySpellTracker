using System.Security.Claims;

namespace FST.Shared.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string? GetValue(this ClaimsPrincipal principal, string type)
    {
        return principal.FindFirst(type)?.Value;
    }
}
