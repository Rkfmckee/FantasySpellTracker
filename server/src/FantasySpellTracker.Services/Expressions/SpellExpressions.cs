using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Expressions;

public static class SpellExpressions
{
    public static Expression<Func<Spell, SpellDto>> ToSpellDto()
    {
        return (spell) => new SpellDto
        {
            Id = spell.Id,
            Name = spell.Name,
            Level = spell.Level,
            School = spell.School,
            CastingTime = spell.CastingTime,
            CastingTimeDescription = spell.CastingTimeDescription,
            Duration = spell.Duration,

            RangeValue = spell.RangeValue,
            RangeType = spell.RangeType,
            RangeDescription = spell.RangeDescription,

            Components = spell.Components,
            ComponentsDescription = spell.ComponentsDescription,
            ComponentsCost = spell.ComponentsCost,

            IsConcentration = spell.IsConcentration,
            IsRitual = spell.IsRitual,

            Description = spell.Description,
            HigherLevelDescription = spell.HigherLevelDescription,

            SourceId = spell.SourceId,
            Source = spell.Source != null ? new SourceDto(spell.Source) : null,

            ClassIds = spell.ClassSpells.Select(cs => cs.ClassId).ToArray(),
            Classes = spell.ClassSpells != null ? spell.ClassSpells.AsQueryable().Select(ClassSpellExpressions.ToSpellClassDto()).ToArray() : null
        };
    }
}
