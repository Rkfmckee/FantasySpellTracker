using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.Shared.Enums.Spell;

public enum SpellCastingTime
{
    [Display(Name = "1 action")]
    Action,

    [Display(Name = "1 bonus action")]
    BonusAction,

    [Display(Name = "1 reaction")]
    Reaction,

    [Display(Name = "1 minute")]
    OneMinute,

    [Display(Name = "10 minutes")]
    TenMinutes,

    [Display(Name = "1 hour")]
    OneHour,

    [Display(Name = "8 hours")]
    EightHours,

    [Display(Name = "12 hours")]
    TwelveHours,

    [Display(Name = "24 hours")]
    TwentyFourHours
}