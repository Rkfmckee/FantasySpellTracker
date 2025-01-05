using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.DTOs.Read;

namespace FantasySpellTracker.Services.Interfaces;
public interface ISpellService
{
    Task<ReadResponseDto<SpellDto>> GetSpellsAsync(ReadRequestDto readRequest);
}