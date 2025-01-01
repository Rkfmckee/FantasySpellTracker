using AutoMapper;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.DTOs.Read;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.Services.Services;

public class SpellService(IFstDataDbContext dataContext, IMapper mapper) : ISpellService
{
    public async Task<ReadResponseDto<SpellDto>> ReadSpellsAsync(ReadRequestDto readRequest)
    {
        var allRecords = dataContext.Get<Spell>()
            .Include(s => s.Source);

        var currentPageData = await mapper.ProjectTo<SpellDto>(allRecords
            .Skip((readRequest.PageNumber - 1) * readRequest.PageSize)
            .Take(readRequest.PageSize))
            .ToArrayAsync();

        return new ReadResponseDto<SpellDto>(currentPageData, await allRecords.CountAsync());
    }
}
