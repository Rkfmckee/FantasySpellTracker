using FantasySpellTracker.Jobs.Scraper.Helpers;
using FantasySpellTracker.Jobs.Scraper.Scrapers;

var dbContext = DatabaseHelper.DbContext;

Console.WriteLine("What data do you want to scrape?");
Console.WriteLine("--------------------------------");
Console.WriteLine("1. Sources");
Console.WriteLine("2. Spells");
Console.WriteLine("--------------------------------");

var optionChosen = Console.ReadLine();
var validOptionChosen = int.TryParse(optionChosen, out var optionInt);
if (!validOptionChosen) return;

switch (optionInt)
{
    case 1:
        await new SourceScraper(dbContext).ScrapeAsync();
        break;
    case 2:
        await new SpellScraper(dbContext).ScrapeAsync();
        break;
}

Console.ReadLine();