namespace FantasySpellTracker.Services.DTOs.Read;

public class SpellReadRequestDto : ReadRequestDto
{
    public int[]? SourceIds { get; set; }
    public int[]? ClassIds { get; set; }
}
