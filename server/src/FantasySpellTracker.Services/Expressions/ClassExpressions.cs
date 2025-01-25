using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Expressions;

public static class ClassExpressions
{
    public static Expression<Func<Class, ClassDto>> ToClassDto()
    {
        return (@class) => new ClassDto
        {
            Id = @class.Id,
            Name = @class.Name
        };
    }
}
