using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.Expressions;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.Services.Services;

public class SourceService(IFstDataDbContext dataDbContext) : ISourceService
{
    public Task<SourceDto[]> GetSpellSourcesAsync()
    {
        return dataDbContext.Get<Source>()
            .Include(s => s.Spells)
            .Where(s => s.Spells.Any())
            .Select(SourceExpressions.ToSourceDto())
            .ToArrayAsync();
    }
}
