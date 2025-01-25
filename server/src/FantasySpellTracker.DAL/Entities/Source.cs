using FantasySpellTracker.Shared.Enums;

namespace FantasySpellTracker.DAL.Entities;

public class Source : Entity
{
    public required string Title { get; set; }
    public SourceType Type { get; set; }

    #region Relationships

    public List<Spell> Spells { get; set; } = new List<Spell>();

    #endregion
}
