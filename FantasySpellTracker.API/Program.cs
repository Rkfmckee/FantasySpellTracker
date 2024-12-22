using FantasySpellTracker.API;
using FantasySpellTracker.DAL.Contexts;
using FantasySpellTracker.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<FstDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IFstDbContext>(provider => provider.GetService<FstDbContext>() ?? throw new Exception("No DbContext configured"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.SeedData();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();