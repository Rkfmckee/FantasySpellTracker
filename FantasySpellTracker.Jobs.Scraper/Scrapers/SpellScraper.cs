using AngleSharp.Dom;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Shared.Enums.Spell;
using FantasySpellTracker.Shared.Extensions;
using FantasySpellTracker.Shared.Helpers;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public class SpellScraper(IFstDbContext dbContext) : Scraper
{
    private const string source = "Source:";
    private const string castingTime = "Casting Time:";
    private const string atHigherLevels = "At Higher Levels.";
    private const string spellLists = "Spell Lists.";

    public override async Task ScrapeAsync()
    {
        var document = await GetDocumentAsync("spells");
        var spellLinks = document.QuerySelectorAll("a[href*=\"spell:\"]").Select(e => e.GetAttribute("href")?.TrimStart('/').Trim()).Distinct().ToArray();
        if (spellLinks.Length <= 0) return;

        foreach (var spellLink in spellLinks)
        {
            if (string.IsNullOrWhiteSpace(spellLink)) continue;

            //var spellDocument = await GetDocumentAsync("spell:absorb-elements");
            //var spellDocument = await GetDocumentAsync("spell:revivify");
            var spellDocument = await GetDocumentAsync("spell:flaming-sphere");
            //var spellDocument = await GetDocumentAsync("spell:feign-death");
            //var spellDocument = await GetDocumentAsync(spellLink);
            if (spellDocument == null) continue;

            var spell = GetSpellDetails(spellDocument);
        }
    }

    protected override Task<IDocument> GetDocumentAsync(string url)
    {
        return base.GetDocumentAsync($"https://dnd5e.wikidot.com/{url}");
    }

    private Spell? GetSpellDetails(IDocument document)
    {
        var name = document.QuerySelector(".page-title")?.QuerySelector("span")?.TextContent ?? "";
        var spell = new Spell { Name = name };

        var detailsSections = document.QuerySelector("#page-content")?.QuerySelectorAll("p");
        if (detailsSections == null || detailsSections.Length < 5) return spell;

        GetSpellLevelAndSchool(detailsSections, spell);
        GetSpellLimits(detailsSections, spell);
        GetSpellDescription(detailsSections, spell);
        GetHigherLevelDescription(detailsSections, spell);

        return spell;
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
        spell.CastingTime = EnumHelpers.GetEnumByDisplayName<CastingTime>(castingTimeSections[0]);
        spell.CastingTimeDescription = hasDescription ? castingTimeSections[1] : null;

        var rangeValueAndType = sections[1].WithoutBoldHtml().Split(' ');
        var hasValue = rangeValueAndType.Length > 1;
        spell.RangeValue = hasValue ? int.Parse(rangeValueAndType[0]) : 0;
        spell.RangeType = EnumHelpers.GetEnumByDisplayName<SpellRangeType>(rangeValueAndType[hasValue ? 1 : 0]);

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
