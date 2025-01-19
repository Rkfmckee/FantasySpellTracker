using FantasySpellTracker.API;
using FantasySpellTracker.API.Configuration;
using FantasySpellTracker.API.Handlers;
using FantasySpellTracker.DAL.Contexts;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.Interfaces;
using FantasySpellTracker.Services.MappingProfiles;
using FantasySpellTracker.Services.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Sieve.Services;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddCors();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddDbContext<FstDataDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DataConnection")));
builder.Services.AddScoped<IFstDataDbContext>(provider => provider.GetService<FstDataDbContext>() ?? throw new Exception("No Data DbContext configured"));

builder.Services.AddDbContext<FstAppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection")));
builder.Services.AddScoped<IFstAppDbContext>(provider => provider.GetService<FstAppDbContext>() ?? throw new Exception("No App DbContext configured"));

builder.Services.AddAutoMapper(typeof(Program), typeof(SpellProfile));

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<ISieveProcessor, FsmSieveProcessor>();

builder.Services.AddScoped<ISpellService, SpellService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapScalarApiReference();
    app.MapOpenApi();
    app.SeedData();
}

app.UseExceptionHandler();

app.UseCors(options =>
{
    options.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();