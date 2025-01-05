namespace FantasySpellTracker.API.ViewModels;

public class ReadResponseViewModel<T>()
{
    public T[]? CurrentPageData { get; set; }
    public int TotalRecords { get; set; }
}
