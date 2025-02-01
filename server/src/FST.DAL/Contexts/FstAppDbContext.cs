using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Contexts;

public class FstAppDbContext(DbContextOptions<FstAppDbContext> options) : BaseDbContext<FstAppDbContext>(options), IFstAppDbContext
{
}
