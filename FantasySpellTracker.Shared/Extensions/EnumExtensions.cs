using System.ComponentModel.DataAnnotations;

namespace FantasySpellTracker.Shared.Extensions;

public static class EnumExtensions
{
    public static T? GetAttribute<T>(this Enum value) where T : Attribute
    {
        var type = value.GetType();
        var memInfo = type.GetMember(value.ToString());
        var attributes = memInfo[0].GetCustomAttributes(typeof(T), false);
        return (attributes.Length > 0) ? (T)attributes[0] : null;
    }

    public static string GetDisplayName(this Enum value)
    {
        return value.GetAttribute<DisplayAttribute>()?.Name ?? value.ToString();
    }
}
