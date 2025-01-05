using FantasySpellTracker.Services.DTOs;
using Sieve.Models;

namespace FantasySpellTracker.Services.Interfaces;
public interface ISpellService
{
    Task<ReadResponseDto<SpellDto>> GetSpellsAsync(SieveModel sieveModel);
}