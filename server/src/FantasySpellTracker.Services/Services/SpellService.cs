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

        var filteredQuery = sieveProcessor.Apply(sieveModel, spellDataQuery);

        sieveModel.PageSize = null;
        sieveModel.Page = null;
        var unpagedQuery = sieveProcessor.Apply(sieveModel, spellDataQuery);

        return new ReadResponseDto<SpellDto>(await filteredQuery.ToArrayAsync(), await unpagedQuery.CountAsync());
    }
}
