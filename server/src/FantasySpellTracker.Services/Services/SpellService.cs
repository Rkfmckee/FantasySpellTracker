using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.Expressions;
using FantasySpellTracker.Services.Interfaces;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace FantasySpellTracker.Services.Services;

public class SpellService(IFstDataDbContext dataContext, ISieveProcessor sieveProcessor) :ISpellService
{
    public async Task<ReadResponseDto<SpellDto>> GetSpellsAsync(SieveModel sieveModel)
    {
        var spellDataQuery = dataContext.Get<Spell>()
            .Include(s => s.Source)
            .AsExpandableEFCore()
            .Select(s => SpellExpressions.ToSpellDto().Invoke(s));

        var records = await sieveProcessor.Apply(sieveModel, spellDataQuery).ToArrayAsync();
        var totalCount = await sieveProcessor.Apply(sieveModel, spellDataQuery, applyPagination: false).CountAsync();

        return new ReadResponseDto<SpellDto>(records, totalCount);
    }
}
