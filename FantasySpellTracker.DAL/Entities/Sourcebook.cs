namespace FantasySpellTracker.DAL.Entities;

public class Sourcebook : Entity
{
    public required string Name { get; set; }

    public IEnumerable<Spell> Spells { get; set; } = new List<Spell>();
}
