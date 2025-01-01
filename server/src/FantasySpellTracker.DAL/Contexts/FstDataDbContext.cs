using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class FstDataDbContext(DbContextOptions<FstDataDbContext> options) : BaseDbContext<FstDataDbContext>(options), IFstDataDbContext
{
    public DbSet<Source> Sources { get; set; }
    public DbSet<Spell> Spells { get; set; }
}
