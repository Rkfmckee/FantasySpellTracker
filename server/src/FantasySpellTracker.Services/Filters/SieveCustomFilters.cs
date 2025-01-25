using FantasySpellTracker.Services.DTOs;
using Sieve.Services;

namespace FantasySpellTracker.Services.Filters;

public class SieveCustomFilters : ISieveCustomFilterMethods
{
    public IQueryable<SpellDto> SpellInClassLists(IQueryable<SpellDto> source, string op, string value)
    {
        var intValues = Array.ConvertAll(value.Split('|'), int.Parse);
        if (intValues == null) return source;

        return source.Where(s => s.ClassIds != null && s.ClassIds.Any(c => intValues.Contains(c)));
    }
}
