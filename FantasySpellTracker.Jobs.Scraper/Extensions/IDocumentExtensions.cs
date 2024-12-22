using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.Jobs.Scraper.Extensions;

public static class IDocumentExtensions
{
    public static IEnumerable<Source>? GetSources(this IDocument document, string groupElementId, SourceType type)
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
