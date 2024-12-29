using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;

namespace FantasySpellTracker.API;

public static class Seed
{
    private static IServiceScope? serviceScope;
    private static IFstDataDbContext? dataDbContext;
    private static IFstAppDbContext? appDbContext;

    private const string defaultPassword = "Pa$$w0rd";

    public static WebApplication SeedData(this WebApplication app)
    {
        using (serviceScope = app.Services.CreateScope())
        {
            var dataDbContext = serviceScope.ServiceProvider.GetRequiredService<IFstDataDbContext>();
            var appDbContext = serviceScope.ServiceProvider.GetRequiredService<IFstAppDbContext>();

            dataDbContext.Database.EnsureCreated();
            appDbContext.Database.EnsureCreated();

            dataDbContext.SaveChanges();
            appDbContext.SaveChanges();
        }

        return app;
    }

    private static bool EntityHasValues<T>() where T : Entity
    {
        var existingItems = dataDbContext!.Get<T>().FirstOrDefault();

        return existingItems is not null;
    }
}