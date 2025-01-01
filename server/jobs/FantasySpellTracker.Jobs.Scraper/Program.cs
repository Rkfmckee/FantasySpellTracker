using FantasySpellTracker.Jobs.Scraper.Helpers;
using FantasySpellTracker.Jobs.Scraper.Scrapers;

var dbContext = DatabaseHelper.DataDbContext;
var shouldScrape = true;

while (shouldScrape)
{
    Console.WriteLine("What data do you want to scrape?");
    Console.WriteLine("---------------------------------");
    Console.WriteLine("1: Sources");
    Console.WriteLine("2: Spells");
    Console.WriteLine("Any key: Exit");
    Console.WriteLine("---------------------------------");

    var optionChosen = Console.ReadLine();
    var validOptionChosen = int.TryParse(optionChosen, out var optionInt);
    if (!validOptionChosen)
    {
        shouldScrape = false;
        break;
    }

    Console.WriteLine("-------- Starting scrape --------");

    switch (optionInt)
    {
        case 1:
            await new SourceScraper(dbContext).ScrapeAsync();
            break;
        case 2:
            await new SpellScraper(dbContext).ScrapeAsync();
            break;
        default:
            shouldScrape = false;
            break;
    }

    Console.WriteLine("---------- Finished scrape ----------");
}