using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Expressions;

public static class SourceExpressions
{
    public static Expression<Func<Source, SourceDto>> ToSourceDto()
    {
        return (source) => new SourceDto
        {
            Id = source.Id,
            Title = source.Title,
            Type = source.Type
        };
    }
}
