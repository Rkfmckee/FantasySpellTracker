using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Enums.Spell;
using FantasySpellTracker.Shared.Extensions;
using FantasySpellTracker.Shared.Helpers;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SpellScraper(IFstDataDbContext dataDbContext) : Scraper
{
    private const string source = "Source:";
    private const string castingTime = "Casting Time:";
    private const string atHigherLevels = "At Higher Levels.";
    private const string spellLists = "Spell Lists.";

    private string[] replaceInName = ["(UA)", "(HB)"];
    private string[] spellsToSkip =
    [
        "Spray of Cards (UA)",
        "Nathair's Mischief (UA)",
        "Antagonize",
        "Protection from Ballistics (UA)",
        "Raulothim's Psychic Lance (UA)",
        "Spirit of Death (UA)",
        "Summon Draconic Spirit (UA)",
        "Fizban's Platinum Shield (UA)",
        "Draconic Transformation (UA)"
    ];

    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("spells");
        var spellLinks = document.QuerySelectorAll("a[href*=\"spell:\"]").Select(e => e.GetAttribute("href")?.TrimStart('/').Trim()).Distinct().ToArray();
        if (spellLinks.Length <= 0) return;

        foreach (var spellLink in spellLinks)
        {
            if (string.IsNullOrWhiteSpace(spellLink)) continue;

            var spellDocument = await GetDocumentAsync(spellLink);
            if (spellDocument == null) continue;

            var spell = await GetSpellDetailsAsync(spellDocument);
            if (spell == null || string.IsNullOrWhiteSpace(spell.Name)) continue;

            Console.WriteLine($"Found spell: {spell.Name}");
            await dataDbContext.AddAsync(spell);
        }

        await dataDbContext.SaveChangesAsync();
    }

    protected override Task<IDocument> GetDocumentAsync(string url)
    {
        return base.GetDocumentAsync($"https://dnd5e.wikidot.com/{url}");
    }

    private async Task<Spell?> GetSpellDetailsAsync(IDocument document)
    {
        var name = document.QuerySelector(".page-title")?.QuerySelector("span")?.TextContent;
        if (string.IsNullOrWhiteSpace(name) || spellsToSkip.Contains(name)) return null;

        var spell = new Spell { Name = RemoveUnwantedTagsFromName(name) };

        var detailsSections = document.QuerySelector("#page-content")?.QuerySelectorAll("p");
        if (detailsSections == null || detailsSections.Length < 5) return spell;

        await GetSourceAsync(detailsSections, spell);

        GetSpellLevelAndSchool(detailsSections, spell);
        GetSpellLimits(detailsSections, spell);
        GetSpellDescription(detailsSections, spell);
        GetHigherLevelDescription(detailsSections, spell);

        return spell;
    }

    private string RemoveUnwantedTagsFromName(string name)
    {
        foreach (var tag in replaceInName)
        {
            name = name.Replace(tag, "");
        }

        return name.Trim();
    }

    private async Task GetSourceAsync(IHtmlCollection<IElement> detailsSections, Spell spell)
    {
        var sourceDescriptionSection = GetSection(detailsSections, source);
        if (sourceDescriptionSection == null) return;

        var sourceText = NormalizeSourceText(sourceDescriptionSection.TextContent);
        var sources = await dataDbContext.Get<Source>().Select(s => Tuple.Create<int?, string>(s.Id, s.Title)).ToArrayAsync();

        var sourceName = CheckManualSources(sourceText) ?? sourceText;
        spell.SourceId = sources.Where(s => s.Item2.NoApostrophes().Contains(sourceName.NoApostrophes())).Select(s => s.Item1).FirstOrDefault();
    }

    private string NormalizeSourceText(string sourceText)
    {
        return sourceText.Replace(source, "")
            .Split('/')[0]
            .Replace("Inc.", "Incorporated")
            .Replace(" - Astral Adventurer's Guide", "")
            .Replace(" -", ":")
            .NormalizeApostrophes().Trim();
    }

    private string? CheckManualSources(string sourceText)
    {
        var manualSources = new string[]
        {
            "Unearthed Arcana",
            "Critical Role"
        };

        foreach (var source in manualSources)
        {
            if (sourceText.Contains(source)) return source;
        }

        return null;
    }

    private void GetSpellLevelAndSchool(IHtmlCollection<IElement> detailsSections, Spell spell)
    {
        var levelAndSchool = GetSpellLevelAndSchoolSection(detailsSections)?.TextContent;

        if (string.IsNullOrWhiteSpace(levelAndSchool)) return;

        var isCantrip = levelAndSchool.ToLower().Contains(SpellLevel.Cantrip.ToString().ToLower());
        var parts = levelAndSchool.Split(' ');

        var levelText = isCantrip ? parts[1] : parts[0].Split('-')[0];
        var schoolText = isCantrip ? parts[0] : parts[1];

        spell.Level = EnumHelpers.GetEnumByDisplayName<SpellLevel>(levelText);
        spell.School = EnumHelpers.GetEnumByDisplayName<SpellSchool>(schoolText);
        spell.IsRitual = parts.Contains("(ritual)");
    }

    private void GetSpellLimits(IHtmlCollection<IElement> detailsSections, Spell spell)
    {
        var limitsSection = GetSection(detailsSections, castingTime);
        if (limitsSection == null) return;

        var sections = limitsSection.InnerHtml.Split("<br>").Select(s => s.Trim()).ToArray();
        if (sections == null || sections.Length == 0) return;

        var castingTimeSections = sections[0].WithoutBoldHtml().Split(", ", 2);
        var hasDescription = castingTimeSections.Length > 1;
        spell.CastingTime = EnumHelpers.GetEnumByDisplayName<SpellCastingTime>(castingTimeSections[0]);
        spell.CastingTimeDescription = hasDescription ? castingTimeSections[1] : null;

        var rangeAndDescription = sections[1].WithoutBoldHtml().Split(" (");
        var rangeValueAndType = rangeAndDescription[0].WithoutBoldHtml().Split(' ');
        var hasValue = rangeValueAndType.Length > 1;
        spell.RangeValue = hasValue ? int.Parse(rangeValueAndType[0].Replace(",", "")) : 0;
        spell.RangeType = EnumHelpers.GetEnumByDisplayName<SpellRangeType>(rangeValueAndType[hasValue ? 1 : 0]);
        spell.RangeDescription = rangeAndDescription.Length > 1 ? rangeAndDescription[1].Trim(')').Replace('-', ' ') : null;

        var componentsAndDescription = sections[2].WithoutBoldHtml().Split(" (");
        var componentsParts = componentsAndDescription[0].Split(", ");
        spell.Components = EnumHelpers.Merge(EnumHelpers.GetEnumsByDisplayNames<SpellComponent>(componentsParts));
        spell.ComponentsDescription = componentsAndDescription.Length > 1 ? componentsAndDescription[1].Trim(')') : null;

        var durationParts = sections[3].WithoutBoldHtml().Split(", ");
        var isConcentration = durationParts.Contains("Concentration");
        spell.Duration = EnumHelpers.GetEnumByDisplayName<SpellDuration>(isConcentration ? durationParts[1].Replace("up to ", "") : durationParts[0]);
        spell.IsConcentration = isConcentration;
    }

    private void GetHigherLevelDescription(IHtmlCollection<IElement> detailsSections, Spell spell)
    {
        var higherLevelDescriptionSection = GetSection(detailsSections, atHigherLevels);
        if (higherLevelDescriptionSection == null) return;

        spell.HigherLevelDescription = higherLevelDescriptionSection.TextContent.Replace(atHigherLevels, "").Trim();
    }

    private void GetSpellDescription(IHtmlCollection<IElement> detailsSections, Spell spell)
    {
        var nonDescriptionSections = new IElement?[]
        {
            GetSection(detailsSections, source),
            GetSpellLevelAndSchoolSection(detailsSections),
            GetSection(detailsSections, castingTime),
            GetSection(detailsSections, atHigherLevels),
            GetSection(detailsSections, spellLists)
        };

        var descriptionSections = detailsSections.Where(ds => !nonDescriptionSections.Any(nds => ds == nds)).ToArray();
        if (descriptionSections == null || descriptionSections.Length == 0) return;

        spell.Description = string.Join("\n", descriptionSections.Select(ds => ds.TextContent?.Trim()));
    }

    private IElement? GetSection(IHtmlCollection<IElement> detailsSections, string section)
    {
        return detailsSections.FirstOrDefault(ds => ds.TextContent.Contains(section));
    }

    private IElement? GetSpellLevelAndSchoolSection(IHtmlCollection<IElement> detailsSections)
    {
        var spellSchools = Enum.GetValues<SpellSchool>().Select(ss => ss.ToString());
        return detailsSections.FirstOrDefault(ds => spellSchools.Any(s => ds.TextContent.Contains(s, StringComparison.CurrentCultureIgnoreCase)));
    }
}
