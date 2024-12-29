using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;

namespace FantasySpellTracker.API;

public static class Seed
{
    private static IServiceScope? serviceScope;
    private static IFstDataDbContext? dataDbContext;

    private const string defaultPassword = "Pa$$w0rd";

    public static WebApplication SeedData(this WebApplication app)
    {
        using (serviceScope = app.Services.CreateScope())
        {
            var dbContext = serviceScope.ServiceProvider.GetRequiredService<IFstDataDbContext>();

            dbContext.Database.EnsureCreated();

            dbContext.SaveChanges();
        }

        return app;
    }

    private static bool EntityHasValues<T>() where T : Entity
    {
        var existingItems = dataDbContext!.Get<T>().FirstOrDefault();

        return existingItems is not null;
    }
}