using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.Expressions;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.Services.Services;

public class ClassService(IFstDataDbContext dataDbContext) : IClassService
{
    public Task<ClassDto[]> GetSpellcastingClassesAsync()
    {
        return dataDbContext.Get<Class>()
            .Include(c => c.ClassSpells)
            .Where(c => c.ClassSpells != null && c.ClassSpells.Any())
            .Select(ClassExpressions.ToClassDto())
            .ToArrayAsync();
    }
}
