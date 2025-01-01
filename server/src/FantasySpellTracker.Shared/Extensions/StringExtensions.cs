using System.Text.RegularExpressions;

namespace FantasySpellTracker.Shared.Extensions;

public static class StringExtensions
{
    public static string WithoutBoldHtml(this string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return "";
        return Regex.Replace(value, RegexConstants.HtmlBoldText, "").Trim();
    }
}
