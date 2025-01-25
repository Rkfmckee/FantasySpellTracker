namespace FantasySpellTracker.DAL.Entities;

public class Class : Entity
{
    public required string Name { get; set; }

    #region Relationships

    public List<SubClass> SubClasses { get; set; } = new List<SubClass>();
    public List<ClassSpell> ClassSpells { get; set; } = new List<ClassSpell>();

    #endregion
}
