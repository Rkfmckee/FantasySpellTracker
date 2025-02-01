using System.Text.RegularExpressions;

namespace FantasySpellTracker.Shared.Extensions;

public static class StringExtensions
{
    public static string WithoutBoldHtml(this string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return "";
        return Regex.Replace(value, RegexConstants.HtmlBoldText, "").Trim();
    }

    public static string NormalizeApostrophes(this string value)
    {
        return value.Replace("’", "'");
    }

    public static string NoApostrophes(this string value)
    {
        return value.Replace("’", "").Replace("'", "");
    }
}
