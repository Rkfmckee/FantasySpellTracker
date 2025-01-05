namespace FantasySpellTracker.Services.DTOs;

public class ReadResponseDto<T>(T[] currentPageData, int totalRecords)
{
    public T[] CurrentPageData { get; set; } = currentPageData;
    public int TotalRecords { get; set; } = totalRecords;
}
