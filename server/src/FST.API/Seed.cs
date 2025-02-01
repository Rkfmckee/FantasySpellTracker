using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;

namespace FantasySpellTracker.API;

public static class Seed
{
    private static IServiceScope? serviceScope;

    public static async Task<WebApplication> SeedDataAsync(this WebApplication app)
    {
        using (serviceScope = app.Services.CreateScope())
        {
            var dataDbContext = serviceScope.ServiceProvider.GetRequiredService<IFstDataDbContext>();
            var appDbContext = serviceScope.ServiceProvider.GetRequiredService<IFstAppDbContext>();

            dataDbContext.Database.EnsureCreated();
            appDbContext.Database.EnsureCreated();

            await dataDbContext.SeedClasses();

            dataDbContext.SaveChanges();
            appDbContext.SaveChanges();
        }

        return app;
    }

    private static async Task SeedClasses(this IFstDbContext dbContext)
    {
        if (dbContext == null || dbContext.EntityHasValues<Class>()) return;

        var classes = new Class[]
        {
            new Class { Name = "Artificer" },
            new Class { Name = "Bard" },
            new Class { Name = "Cleric" },
            new Class { Name = "Druid" },
            new Class { Name = "Fighter", SubClasses = [new SubClass { Name = "Eldritch Knight" }] },
            new Class { Name = "Paladin" },
            new Class { Name = "Ranger" },
            new Class { Name = "Rogue", SubClasses = [new SubClass { Name = "Arcane Trickster" }] },
            new Class { Name = "Sorcerer" },
            new Class { Name = "Warlock" },
            new Class { Name = "Wizard" },
        };

        await dbContext.AddAsync(classes);
    }

    private static bool EntityHasValues<T>(this IFstDbContext dbContext) where T : Entity
    {
        return dbContext!.Get<T>().FirstOrDefault() != null;
    }
}