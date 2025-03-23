using System.Security.Claims;

namespace FST.Shared.Constants;

public static class ClaimConstants
{
    public const string UserId = ClaimTypes.NameIdentifier;
    public const string UserName = "preferred_username";
}
