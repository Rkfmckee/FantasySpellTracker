using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SourceScraper(IFstDbContext dbContext) : Scraper
{
    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("https://www.dndbeyond.com/sources");

        var sourceBooks = GetSources(document, "Sourcebooks", SourceType.Sourcebook)?.ToArray();
        var adventures = GetSources(document, "Adventures", SourceType.Adventure)?.ToArray();
        var partnered = GetSources(document, "PartneredContent", SourceType.Partnered)?.ToArray();

        if (sourceBooks?.Length > 0) await dbContext.AddAsync(sourceBooks);
        if (adventures?.Length > 0) await dbContext.AddAsync(adventures);
        if (partnered?.Length > 0) await dbContext.AddAsync(partnered);

        await dbContext.SaveChangesAsync();
    }

    private IEnumerable<Source>? GetSources(IDocument document, string groupElementId, SourceType type)
    {
        var sourceElements = document.QuerySelector($"#{groupElementId}")?.QuerySelectorAll(".sources-listing--item--title");
        if (sourceElements == null) return null;

        Console.WriteLine($"Sources found for {type}:");
        var sources = new List<Source>();

        foreach (var sourceElement in sourceElements)
        {
            var extraSpans = sourceElement.QuerySelectorAll("span");

            foreach (var extraSpan in extraSpans)
            {
                extraSpan.Remove();
            }

            var source = new Source
            {
                Title = sourceElement.TextContent.Trim(),
                Type = type
            };
            sources.Add(source);

            Console.WriteLine(source.Title);
        }

        Console.WriteLine($"Total: {sources.Count}");
        return sources;
    }
}
