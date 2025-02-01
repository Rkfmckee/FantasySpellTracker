using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.DTOs.Read;
using FantasySpellTracker.Services.Expressions;
using FantasySpellTracker.Services.Extensions;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.Services.Services;

public class SpellService(IFstDataDbContext dataContext) : ISpellService
{
    public async Task<ReadResponseDto<SpellDto>> GetSpellsAsync(SpellReadRequestDto readRequest)
    {
        var (query, totalCount) = await dataContext.Get<Spell>()
            .Include(s => s.ClassSpells).ThenInclude(cs => cs.Class)
            .Include(s => s.Source)
            .ApplyReadRequestAsync(readRequest);

        var records = await query.Select(SpellExpressions.ToSpellDto()).ToArrayAsync();
        return new ReadResponseDto<SpellDto>(records, totalCount);
    }
}
