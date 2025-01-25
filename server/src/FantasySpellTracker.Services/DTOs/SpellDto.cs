using FantasySpellTracker.Shared.Enums.Spell;
using Sieve.Services;

namespace FantasySpellTracker.Services.DTOs;

public class SpellDto
{
    public int Id { get; set;}
    public string? Name { get; set; }
    public SpellLevel Level { get; set; }
    public SpellSchool School { get; set; }
    public SpellCastingTime CastingTime { get; set; }
    public string? CastingTimeDescription { get; set; }
    public SpellDuration Duration { get; set; }

    public int RangeValue { get; set; }
    public SpellRangeType RangeType { get; set; }
    public string? RangeDescription { get; set; }

    public SpellComponent? Components { get; set; }
    public string? ComponentsDescription { get; set; }
    public string? ComponentsCost { get; set; }

    public string? Description { get; set; }
    public string? HigherLevelDescription { get; set; }

    public bool IsConcentration { get; set; }
    public bool IsRitual { get; set; }
    public bool CanUpcast => Level != SpellLevel.Cantrip && !string.IsNullOrWhiteSpace(HigherLevelDescription);

    public SourceDto? Source { get; set; }
    public SpellClassDto[]? Classes { get; set; }
}

public class SpellSieve : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<SpellDto>(s => s.Name).CanFilter().CanSort();
        mapper.Property<SpellDto>(s => s.Level).CanFilter().CanSort();
        mapper.Property<SpellDto>(s => s.CastingTime).CanFilter().CanSort();
        mapper.Property<SpellDto>(s => s.Duration).CanFilter().CanSort();
        mapper.Property<SpellDto>(s => s.RangeValue).CanFilter().CanSort();
        mapper.Property<SpellDto>(s => s.RangeType).CanFilter().CanSort();

        mapper.Property<SpellDto>(s => s.School).CanFilter();
        mapper.Property<SpellDto>(s => s.Components).CanFilter();
        mapper.Property<SpellDto>(s => s.IsConcentration).CanFilter();
        mapper.Property<SpellDto>(s => s.IsRitual).CanFilter();
    }
}