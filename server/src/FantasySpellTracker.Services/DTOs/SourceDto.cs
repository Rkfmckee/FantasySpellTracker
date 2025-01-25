using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.Services.DTOs;

public class SourceDto
{
    public SourceDto()
    {
    }

    public SourceDto(Source source)
    {
        Id = source.Id;
        Title = source.Title;
        Type = source.Type;
    }

    public int Id { get; set; }
    public string? Title { get; set; }
    public SourceType Type { get; set; }
}
