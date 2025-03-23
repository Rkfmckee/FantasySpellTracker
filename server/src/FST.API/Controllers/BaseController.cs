using Microsoft.AspNetCore.Mvc;

namespace FST.API.Controllers;

public abstract class BaseController : ControllerBase
{
    protected ObjectResult Problem(string? detail)
    {
        return base.Problem(detail, null, 400, null, null);
    }

    protected ActionResult OkOrProblem(bool value, string? errorMessage = null)
    {
        return value ? Ok() : Problem(errorMessage);
    }

    protected ActionResult OkOrProblem(object? value, string? errorMessage = null)
    {
        return HasNoValueOrItems(value) ? Problem(errorMessage) : Ok(value);
    }

    private bool HasNoValueOrItems(object? value)
    {
        return value == null || (value is ICollection<object> && ((ICollection<object>)value).Count == 0);
    }
}
