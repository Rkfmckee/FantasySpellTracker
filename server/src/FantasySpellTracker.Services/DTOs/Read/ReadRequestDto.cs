using FantasySpellTracker.Shared.Enums.Filter;

namespace FantasySpellTracker.Services.DTOs.Read;

public class ReadRequestDto
{
    public FilterDto[]? Filters { get; set; }
    public string[]? SortPropertyNames { get; set; }
    public SortOrder SortOrder { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}
