using FantasySpellTracker.DAL.Contexts;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FantasySpellTracker.Jobs.Scraper.Helpers;

public static class DatabaseHelper
{
    public static IFstDataDbContext DataDbContext => SetupDbContext();

    private static IFstDataDbContext SetupDbContext()
    {
        var apiDirectory = $"{DirectoryHelpers.GetSolutionDirectory()}/FantasySpellTracker.API";
        var config = new ConfigurationBuilder().SetBasePath(apiDirectory).AddJsonFile("appsettings.json", optional: false).Build();
        var services = new ServiceCollection();

        services.AddDbContext<FstDataDbContext>(options => { options.UseSqlServer(config.GetConnectionString("DataConnection")); });
        services.AddScoped<IFstDataDbContext>(provider => provider.GetService<FstDataDbContext>() ?? throw new Exception("No Data DbContext configured"));

        return services.BuildServiceProvider().GetService<IFstDataDbContext>() ?? throw new Exception("Couldn't create Data DbContext");
    }
}
