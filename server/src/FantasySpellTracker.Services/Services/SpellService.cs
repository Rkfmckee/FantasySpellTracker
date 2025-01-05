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
        var allRecords = dataContext.Get<Spell>()
            .Include(s => s.Source);

        var spellDataQuery = allRecords
            .AsExpandableEFCore()
            .Select(s => SpellExpressions.ToSpellDto().Invoke(s));

        var currentRecords = await sieveProcessor.Apply(sieveModel, spellDataQuery)
            .ToArrayAsync();

        return new ReadResponseDto<SpellDto>(currentRecords, await allRecords.CountAsync());
    }
}
