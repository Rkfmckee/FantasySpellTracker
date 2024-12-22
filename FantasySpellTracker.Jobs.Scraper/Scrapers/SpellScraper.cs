
using FantasySpellTracker.DAL.Interfaces;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SpellScraper(IFstDbContext dbContext) : Scraper
{
    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("https://dnd5e.wikidot.com/spells");

    }
}
