namespace FantasySpellTracker.Shared.Extensions;

public static class DirectoryHelpers
{
    public static string? GetSolutionDirectory()
    {
        var directory = new DirectoryInfo(Directory.GetCurrentDirectory());

        while (directory != null && !directory.GetFiles("*.sln").Any())
        {
            directory = directory.Parent;
        }
        return directory?.ToString();
    }
}
