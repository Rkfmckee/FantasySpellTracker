using Microsoft.AspNetCore.Mvc;

namespace FST.API.Controllers;

public abstract class BaseController : ControllerBase
{
    public ObjectResult Problem(string? detail)
    {
        return base.Problem(detail, null, 400, null, null);
    }

    public ActionResult OkOrProblem(bool value, string? errorMessage = null)
    {
        return value ? Ok() : Problem(errorMessage);
    }
}
