using FST.Services.Interfaces;
using FST.Shared.Constants;
using FST.Shared.Extensions;
using Microsoft.AspNetCore.Http;

namespace FST.Services.Services;

public class UserService(IHttpContextAccessor httpContextAccessor) : IUserService
{
    public string? GetCurrentUserId()
    {
        return httpContextAccessor.HttpContext?.User.GetValue(ClaimConstants.UserId);
    }
}
