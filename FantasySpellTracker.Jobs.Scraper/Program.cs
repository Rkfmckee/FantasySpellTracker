using AngleSharp;
using FantasySpellTracker.Jobs.Scraper.Extensions;
using FantasySpellTracker.Jobs.Scraper.Helpers;
using FantasySpellTracker.Shared.Enums;

var dbContext = DatabaseHelper.DbContext;

using var httpClient = new HttpClient();
var response = await httpClient.GetAsync("https://www.dndbeyond.com/sources");
var htmlContent = await response.Content.ReadAsStringAsync();

// AngleSharp config
var config = Configuration.Default.WithDefaultLoader();
var context = BrowsingContext.New(config);
var document = await context.OpenAsync(r => r.Content(htmlContent));

var sourceBooks = document.GetSources("Sourcebooks", SourceType.Sourcebook)?.ToArray();
var adventures = document.GetSources("Adventures", SourceType.Adventure)?.ToArray();
var partnered = document.GetSources("PartneredContent", SourceType.Partnered)?.ToArray();

if (sourceBooks?.Length > 0) await dbContext.AddAsync(sourceBooks);
if (adventures?.Length > 0) await dbContext.AddAsync(adventures);
if (partnered?.Length > 0) await dbContext.AddAsync(partnered);
await dbContext.SaveChangesAsync();

Console.ReadLine();