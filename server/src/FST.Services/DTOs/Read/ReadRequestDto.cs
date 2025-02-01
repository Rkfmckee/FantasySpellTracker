namespace FantasySpellTracker.Services.DTOs.Read;

public class ReadRequestDto
{
    public string? Filter { get; set; }
    public string? Sort { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
}
