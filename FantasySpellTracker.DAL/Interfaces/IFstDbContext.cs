using Microsoft.EntityFrameworkCore.Infrastructure;

namespace FantasySpellTracker.DAL.Interfaces;

public interface IFstDbContext
{
    public DatabaseFacade Database { get; }

    IQueryable<T> Get<T>() where T : class;
    void Add<T>(params T[] items) where T : class;
    T Add<T>(T item) where T : class;
    Task AddAsync<T>(params T[] items) where T : class;
    void Delete<T>(params T[] items) where T : class;
    int SaveChanges();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}