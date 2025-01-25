using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Expressions;

public static class ClassSpellExpressions
{
    public static Expression<Func<ClassSpell, SpellClassDto>> ToSpellClassDto()
    {
        return (spellClass) => new SpellClassDto
        {
            ClassId = spellClass.ClassId,
            Optional = spellClass.Optional,
            ClassName = spellClass.Class.Name
        };
    }
}
