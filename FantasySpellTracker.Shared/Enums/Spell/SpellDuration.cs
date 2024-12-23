using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.Shared.Enums.Spell;

public enum SpellDuration
{
    Instantaneous,

    [Display(Name = "1 round")]
    OneRound,

    [Display(Name = "6 rounds")]
    SixRounds,

    [Display(Name = "1 minute")]
    OneMinute,

    [Display(Name = "10 minutes")]
    TenMinutes,

    [Display(Name = "1 hour")]
    OneHour,

    [Display(Name = "2 hours")]
    TwoHours,

    [Display(Name = "6 hours")]
    SixHours,

    [Display(Name = "8 hours")]
    EightHours,

    [Display(Name = "24 hours")]
    TwentyFourHours,

    [Display(Name = "1 day")]
    OneDay,

    [Display(Name = "7 days")]
    SevenDays,

    [Display(Name = "10 days")]
    TenDays,

    [Display(Name = "30 days")]
    ThirtyDays,

    [Display(Name = "Until dispelled")]
    UntilDispelled,

    [Display(Name = "Until dispelled or triggered")]
    UntilDispelledOrTriggered,

    Special
}
