using Microsoft.EntityFrameworkCore;

namespace FantasySpellTracker.DAL.Entities;

[PrimaryKey(nameof(ClassId), nameof(SpellId))]
public class ClassSpell
{
    public int ClassId { get; set; }
    public Class Class { get; set; } = null!;

    public int SpellId { get; set; }
    public Spell Spell { get; set; } = null!;

    public bool Optional { get; set; }
}
