using FantasySpellTracker.Shared.Enums;
using FantasySpellTracker.Shared.Enums.Spell;

namespace FantasySpellTracker.DAL.Entities;

public class Spell : Entity
{
    public required string Name { get; set; }
    public SpellLevel Level { get; set; }
    public SpellSchool School { get; set; }
    public SpellCastingTime CastingTime { get; set; }
    public string? CastingTimeDescription { get; set; }
    public SpellDuration Duration { get; set; }

    public int RangeValue { get; set; }
    public SpellRangeType RangeType { get; set; }
    public string? RangeDescription { get; set; }

    public int? AreaValue { get; set; }
    public SpellAreaType? AreaType { get; set; }

    public AttackType? AttackType { get; set; }
    public Ability? SaveType { get; set; }

    public DamageType? DamageTypes { get; set; }
    public Condition? Conditions { get; set; }
    public SpellComponent? Components { get; set; }
    public string? ComponentsDescription { get; set; }
    public string? ComponentsCost { get; set; }

    public bool IsConcentration { get; set; }
    public bool IsRitual { get; set; }

    public string? Description { get; set; }
    public string? HigherLevelDescription { get; set; }

    #region Relationships

    public int? SourceId { get; set; }
    public Source? Source { get; set; }

    public IEnumerable<ClassSpell>? ClassSpells { get; set; }

    #endregion
}
