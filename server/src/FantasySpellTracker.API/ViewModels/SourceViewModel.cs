using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.API.ViewModels;

public class SourceViewModel
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public SourceType Type { get; set; }
}
