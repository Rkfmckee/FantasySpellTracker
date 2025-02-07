﻿using FantasySpellTracker.Shared.Enums.Spell;

namespace FantasySpellTracker.API.ViewModels;

public class SpellViewModel
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
    public bool CanUpcast { get; set; }
    public bool HasMaterialCost { get; set; }

    public SourceViewModel? Source { get; set; }
    public SpellClassViewModel[]? Classes { get; set; }
}
