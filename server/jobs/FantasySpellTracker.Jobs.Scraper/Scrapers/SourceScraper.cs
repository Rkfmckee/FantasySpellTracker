using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Enums;
using FantasySpellTracker.Shared.Extensions;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SourceScraper(IFstDataDbContext dataDbContext) : Scraper
{
    private readonly Dictionary<string, string> namesToChange = new()
    {
        { "Critical Role: Call of the Netherdeep", "Critical Role" }
    };

    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("https://www.dndbeyond.com/sources");

        var sourceBooks = GetSources(document, "Sourcebooks", SourceType.Sourcebook)?.ToArray();
        var adventures = GetSources(document, "Adventures", SourceType.Adventure)?.ToArray();
        var partnered = GetSources(document, "PartneredContent", SourceType.Partnered)?.ToArray();
        var manual = GetManualSources();

        if (sourceBooks?.Length > 0) await dataDbContext.AddAsync(sourceBooks);
        if (adventures?.Length > 0) await dataDbContext.AddAsync(adventures);
        if (partnered?.Length > 0) await dataDbContext.AddAsync(partnered);
        if (manual?.Length > 0) await dataDbContext.AddAsync(manual);

        await dataDbContext.SaveChangesAsync();
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

            var title = sourceElement.TextContent.NormalizeApostrophes().Trim();
            if (title.Contains("(2024)")) continue;
            if (title.Contains("(2014)")) title = title.Replace(" (2014)", "");

            var source = new Source
            {
                Title = CheckForNameChanges(title) ?? title,
                Type = type
            };

            sources.Add(source);
            Console.WriteLine(source.Title);
        }

        Console.WriteLine($"Total: {sources.Count}");
        return sources;
    }

    private string? CheckForNameChanges(string sourceName)
    {
        if (namesToChange.ContainsKey(sourceName)) return namesToChange[sourceName];
        return null;
    }

    private Source[]? GetManualSources()
    {
        return [];
    }
}
