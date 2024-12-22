using FantasySpellTracker.DAL.Contexts;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FantasySpellTracker.Jobs.Scraper.Helpers;

public static class DatabaseHelper
{
    public static IFstDbContext DbContext => SetupDbContext();

    private static IFstDbContext SetupDbContext()
    {
        var apiDirectory = $"{DirectoryHelpers.GetSolutionDirectory()}/FantasySpellTracker.API";
        var config = new ConfigurationBuilder().SetBasePath(apiDirectory).AddJsonFile("appsettings.json", optional: false).Build();
        var services = new ServiceCollection();

        services.AddDbContext<FstDbContext>(options => { options.UseSqlServer(config.GetConnectionString("DefaultConnection")); });
        services.AddScoped<IFstDbContext>(provider => provider.GetService<FstDbContext>() ?? throw new Exception("No DbContext configured"));

        return services.BuildServiceProvider().GetService<IFstDbContext>() ?? throw new Exception("Couldn't create DbContext");
    }
}
