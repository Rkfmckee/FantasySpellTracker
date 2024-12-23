using AngleSharp;
using AngleSharp.Dom;

namespace FantasySpellTracker.Jobs.Scraper.Scrapers;

public abstract class Scraper
{
    public abstract Task ScrapeAsync();

    protected virtual async Task<IDocument> GetDocumentAsync(string url)
    {
        using var httpClient = new HttpClient();
        var response = await httpClient.GetAsync(url);
        var htmlContent = await response.Content.ReadAsStringAsync();

        var config = Configuration.Default.WithDefaultLoader();
        var context = BrowsingContext.New(config);
        return await context.OpenAsync(r => r.Content(htmlContent));
    }
}
