namespace FantasySpellTracker.DAL.Interfaces;

public interface IFstDbContext
{
    void Add<T>(params T[] items) where T : class;
    T Add<T>(T item) where T : class;
    void AddAsync<T>(params T[] items) where T : class;
    void Delete<T>(params T[] items) where T : class;
    IQueryable<T> Get<T>() where T : class;
}