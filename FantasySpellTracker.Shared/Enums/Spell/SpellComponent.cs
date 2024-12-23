using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.Shared.Enums.Spell;

[Flags]
public enum SpellComponent
{
    None = 0,

    [Display(Name = "V")]
    Verbal = 1,

    [Display(Name = "S")]
    Somatic = 2,

    [Display(Name = "M")]
    Material = 4,

    All = Verbal | Somatic | Material
}
