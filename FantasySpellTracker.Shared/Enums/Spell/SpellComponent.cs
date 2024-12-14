namespace FantasySpellTracker.Shared.Enums.Spell;

[Flags]
public enum SpellComponent
{
    None = 0,
    Verbal = 1,
    Somatic = 2,
    Material = 4,

    All = Verbal | Somatic | Material
}
