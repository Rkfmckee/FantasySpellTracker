namespace FantasySpellTracker.Services.DTOs.Read;

public class SpellReadRequestDto : ReadRequestDto
{
    public int[]? ClassIds { get; set; }
}
