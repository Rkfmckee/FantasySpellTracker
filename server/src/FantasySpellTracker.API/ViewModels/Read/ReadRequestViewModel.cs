using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.ViewModels.Read;

public class ReadRequestViewModel
{
    [FromQuery]
    public string? Filter { get; set; }

    [FromQuery]
    public string? Sort { get; set; }

    [FromQuery]
    public int? Page { get; set; }

    [FromQuery]
    public int? PageSize { get; set; }
}
