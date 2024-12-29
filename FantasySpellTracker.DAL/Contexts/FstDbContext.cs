using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class FstDataDbContext(DbContextOptions options) : BaseDbContext(options), IFstDataDbContext
{
    public DbSet<Source> Sources { get; set; }
    public DbSet<Spell> Spells { get; set; }
}
