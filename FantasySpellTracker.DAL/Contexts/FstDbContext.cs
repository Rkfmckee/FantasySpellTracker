using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class FstDbContext(DbContextOptions options) : DbContext(options), IFstDbContext
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

    public DbSet<Source> Sources { get; set; }
    public DbSet<Spell> Spells { get; set; }
}
