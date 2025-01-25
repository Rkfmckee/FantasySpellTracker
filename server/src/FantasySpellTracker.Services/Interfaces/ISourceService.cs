using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.Services.Interfaces;
public interface ISourceService
{
    Task<SourceDto[]> GetSpellSourcesAsync();
}