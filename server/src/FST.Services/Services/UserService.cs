using FST.Services.Interfaces;
using FST.Shared.Constants;
using System.Security.Claims;

namespace FST.Services.Services;

public class UserService(IHttpContextAccessor httpContextAccessor) : IUserService
{
    public string? GetCurrentUserId()
    {
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimConstants.UserId);
    }
}
