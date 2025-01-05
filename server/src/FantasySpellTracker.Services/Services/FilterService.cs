using FantasySpellTracker.Shared.Enums.Filter;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Services;

public abstract class FilterService<T>
{
    protected abstract Expression<Func<T, object>> GetSortProperty(string propertyName);

    protected IQueryable<T> SortQuery(IQueryable<T> query, string[]? sortPropertyNames, SortOrder sortOrder)
    {
        if (sortPropertyNames == null || sortPropertyNames.Length == 0) return query;

        if (sortOrder == SortOrder.Descending)
        {
            var orderedQuery = query.OrderByDescending(GetSortProperty(sortPropertyNames[0]));

            if (sortPropertyNames.Length == 1) return orderedQuery;

            for (int i = 1; i < sortPropertyNames.Length; i++)
            {
                orderedQuery.ThenByDescending(GetSortProperty(sortPropertyNames[i]));
            }

            return orderedQuery;
        }
        else
        {
            var orderedQuery = query.OrderBy(GetSortProperty(sortPropertyNames[0]));

            if (sortPropertyNames.Length == 1) return orderedQuery;

            for (int i = 1; i < sortPropertyNames.Length; i++)
            {
                orderedQuery.ThenBy(GetSortProperty(sortPropertyNames[i]));
            }

            return orderedQuery;
        }
    }
}
