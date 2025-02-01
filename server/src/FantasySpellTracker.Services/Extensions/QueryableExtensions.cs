using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs.Read;
using Microsoft.EntityFrameworkCore;
using QueryKit;

namespace FantasySpellTracker.Services.Extensions;

public static class QueryableExtensions
{
    public static async Task<Tuple<IQueryable<T>, int>> ApplyReadRequestAsync<T>(this IQueryable<T> query, ReadRequestDto readRequest) where T : class
    {
        readRequest.Filter = readRequest.Filter?.Replace("|", "&&");

        if (!string.IsNullOrWhiteSpace(readRequest.Filter))
        {
            query = query.ApplyQueryKitFilter(readRequest.Filter);
        }

        if (!string.IsNullOrWhiteSpace(readRequest.Sort))
        {
            query = query.ApplyQueryKitSort(readRequest.Sort);
        }

        var totalRecords = await query.CountAsync();

        var page = readRequest.Page ?? 1;
        var pageSize = readRequest.PageSize ?? 10;
        query = query.Skip((page - 1) * pageSize).Take(pageSize);

        return Tuple.Create(query, totalRecords);
    }

    public static Task<Tuple<IQueryable<Spell>, int>> ApplyReadRequestAsync(this IQueryable<Spell> query, SpellReadRequestDto readRequest)
    {
        if (readRequest.SourceIds?.Length > 0)
        {
            query = query.Where(s => s.Source != null && readRequest.SourceIds.Contains(s.Source.Id));
        }

        if (readRequest.ClassIds?.Length > 0)
        {
            query = query.Where(s => s.ClassSpells != null && s.ClassSpells.Select(c => c.ClassId).Any(id => readRequest.ClassIds.Contains(id)));
        }

        return ApplyReadRequestAsync<Spell>(query, readRequest);
    }
}
