using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;
using System.Linq.Expressions;

namespace FantasySpellTracker.Services.Expressions;

public static class SourceExpressions
{
    public static Expression<Func<Source?, SourceDto?>> ToSourceDto()
    {
        return (source) => source != null ? new SourceDto
        {
            Title = source.Title,
            Type = source.Type
        } : null;
    }
}
