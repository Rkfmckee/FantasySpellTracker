using AngleSharp.Dom;
using AngleSharp.Html.Dom;
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

    public static int GetNumberOfSpellPages(this IDocument document)
    {
        var pagingListElement = document.QuerySelector(".listing-footer")?.QuerySelector(".paging-list");
        var pagingElements = pagingListElement?.QuerySelectorAll(".b-pagination-item:not(.b-pagination-item-next)");

        var isValid = int.TryParse(pagingElements?.LastOrDefault()?.TextContent.Trim(), out var numberOfPages);
        return isValid ? numberOfPages : 0;
    }

    public static IEnumerable<Spell> GetSpells(this IDocument document)
    {
        var spellElement = (IHtmlElement?)document.QuerySelector(".info");
        var openBefore = spellElement?.GetAttribute("data-isopen");
        spellElement?.DoClick();
        var openAfter = spellElement?.GetAttribute("data-isopen");

        return [];
    }
}