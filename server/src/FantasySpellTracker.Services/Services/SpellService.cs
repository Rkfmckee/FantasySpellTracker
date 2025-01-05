using AutoMapper;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.DTOs.Read;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Services;

public class SpellService(IFstDataDbContext dataContext, IMapper mapper) : FilterService<Spell>, ISpellService
{
    public async Task<ReadResponseDto<SpellDto>> GetSpellsAsync(ReadRequestDto readRequest)
    {
        var allRecords = dataContext.Get<Spell>()
            .Include(s => s.Source);

        var currentPageData = await mapper.ProjectTo<SpellDto>(
            SortQuery(allRecords, readRequest.SortPropertyNames, readRequest.SortOrder)
            .Skip((readRequest.PageNumber - 1) * readRequest.PageSize)
            .Take(readRequest.PageSize))
            .ToArrayAsync();

        return new ReadResponseDto<SpellDto>(currentPageData, await allRecords.CountAsync());
    }

    protected override Expression<Func<Spell, object>> GetSortProperty(string propertyName)
    {
        return propertyName.ToLower() switch
        {
            "name" => spell => spell.Name,
            "level" => spell => spell.Level,
            "casting_time" => spell => spell.CastingTime,
            "duration" => spell => spell.Duration,
            "range_type" => spell => spell.RangeType,
            "range_value" => spell => spell.RangeValue,
            _ => spell => spell.Id,
        };
    }
}
