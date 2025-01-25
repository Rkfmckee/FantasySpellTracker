using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class FstDataDbContext(DbContextOptions<FstDataDbContext> options) : BaseDbContext<FstDataDbContext>(options), IFstDataDbContext
{
    public DbSet<Class> Classes { get; set; }
    public DbSet<ClassSpell> ClassSpells { get; set; }
    public DbSet<Source> Sources { get; set; }
    public DbSet<Spell> Spells { get; set; }
    public DbSet<SubClass> SubClasses { get; set; }
}
