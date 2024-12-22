using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Jobs.Scraper.Extensions;
using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SourceScraper(IFstDbContext dbContext) : Scraper
{
    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("https://www.dndbeyond.com/sources");

        var sourceBooks = document.GetSources("Sourcebooks", SourceType.Sourcebook)?.ToArray();
        var adventures = document.GetSources("Adventures", SourceType.Adventure)?.ToArray();
        var partnered = document.GetSources("PartneredContent", SourceType.Partnered)?.ToArray();

        if (sourceBooks?.Length > 0) await dbContext.AddAsync(sourceBooks);
        if (adventures?.Length > 0) await dbContext.AddAsync(adventures);
        if (partnered?.Length > 0) await dbContext.AddAsync(partnered);

        await dbContext.SaveChangesAsync();
    }
}
