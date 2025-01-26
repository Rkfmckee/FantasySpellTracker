using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.ViewModels.Read;

public class SpellReadRequestViewModel : ReadRequestViewModel
{
    [FromQuery]
    public int[]? SourceIds { get; set; }

    [FromQuery]
    public int[]? ClassIds { get; set; }
}
