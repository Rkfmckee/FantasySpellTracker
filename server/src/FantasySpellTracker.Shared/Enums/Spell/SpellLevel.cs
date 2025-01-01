using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.Shared.Enums.Spell;

public enum SpellLevel
{
    Cantrip,

    [Display(Name = "1st")]
    First,

    [Display(Name = "2nd")]
    Second,

    [Display(Name = "3rd")]
    Third,

    [Display(Name = "4th")]
    Fourth,

    [Display(Name = "5th")]
    Fifth,

    [Display(Name = "6th")]
    Sixth,

    [Display(Name = "7th")]
    Seventh,

    [Display(Name = "8th")]
    Eighth,

    [Display(Name = "9th")]
    Ninth
}
