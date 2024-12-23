
using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SpellScraper(IFstDbContext dbContext) : Scraper
{
    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync($"spells");
        var spellLinks = document.QuerySelectorAll("a[href*=\"spell:\"]").Select(e => e.GetAttribute("href")?.TrimStart('/').Trim()).Distinct().ToArray();
        if (spellLinks.Length <= 0) return;

        var spellLink = spellLinks.FirstOrDefault();

        if (string.IsNullOrWhiteSpace(spellLink)) return;

        var spellDocument = await GetDocumentAsync(spellLink);
        if (spellDocument == null) return;

        var spell = GetSpellDetails(spellDocument);
        Console.WriteLine($"Found spell: {spell.Name}");

        var x = 0;
    }

    protected override Task<IDocument> GetDocumentAsync(string url)
    {
        return base.GetDocumentAsync($"https://dnd5e.wikidot.com/{url}");
    }

    private Spell GetSpellDetails(IDocument document)
    {
        var name = document.QuerySelector(".page-title")?.QuerySelector("span")?.TextContent ?? "";

        return new Spell
        {
            Name = name
        };
    }
}
