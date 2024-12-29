using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class BaseDbContext<TContext>(DbContextOptions<TContext> options) : DbContext(options), IFstDbContext
    where TContext : DbContext
{
    public IQueryable<T> Get<T>() where T : class
    {
        return Set<T>().AsQueryable();
    }

    public new T Add<T>(T item) where T : class
    {
        return Set<T>().Add(item).Entity;
    }

    public void Add<T>(params T[] items) where T : class
    {
        Set<T>().AddRange(items);
    }

    public Task AddAsync<T>(params T[] items) where T : class
    {
        return Set<T>().AddRangeAsync(items);
    }

    public void Delete<T>(params T[] items) where T : class
    {
        Set<T>().RemoveRange(items);
    }
}
