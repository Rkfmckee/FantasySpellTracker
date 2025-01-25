using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.Services.Interfaces;
public interface IClassService
{
    Task<ClassDto[]> GetSpellcastingClassesAsync();
}