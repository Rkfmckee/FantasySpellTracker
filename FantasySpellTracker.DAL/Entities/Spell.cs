﻿using FantasySpellTracker.Shared.Enums;
using FantasySpellTracker.Shared.Enums.Spell;

namespace FantasySpellTracker.DAL.Entities;

public class Spell : Entity
{
    public required string Name { get; set; }
    public SpellLevel Level { get; set; }
    public SpellSchool School { get; set; }
    public CastingTime CastingTime { get; set; }
    public SpellDuration Duration { get; set; }

    public int RangeValue { get; set; }
    public SpellRangeType RangeType { get; set; }

    public int? AreaValue { get; set; }
    public SpellAreaType? AreaType { get; set; }

    public AttackType? AttackType { get; set; }
    public Ability? SaveType { get; set; }

    public DamageType? DamageTypes { get; set; }
    public Condition? Conditions { get; set; }
    public SpellComponent? Components { get; set; }
    public string? MaterialComponent { get; set; }

    public bool IsConcentration { get; set; }
    public bool IsRitual { get; set; }

    public int SourcebookId { get; set; }
    public required Sourcebook Sourcebook { get; set; }
}
