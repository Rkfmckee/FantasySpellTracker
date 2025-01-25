namespace FantasySpellTracker.DAL.Entities;

public class SubClass : Entity
{
    public required string Name { get; set; }

    #region Relationships

    public int ClassId { get; set; }
    public Class Class { get; set; } = null!;

    public List<ClassSpell> ClassSpells { get; set; } = new List<ClassSpell>();

    #endregion
}
