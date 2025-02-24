using FantasySpellTracker.API;
using FantasySpellTracker.API.Handlers;
using FantasySpellTracker.DAL.Contexts;
using FantasySpellTracker.DAL.Interfaces;
using FantasySpellTracker.Services.Interfaces;
using FantasySpellTracker.Services.MappingProfiles;
using FantasySpellTracker.Services.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using FST.API.Extensions;
using FST.Services.Interfaces;
using FST.Services.Services;
using FST.Shared.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenWithAuth(builder.Configuration);
builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.Audience = builder.Configuration["Authentication:Audience"];
        options.MetadataAddress = builder.Configuration["Authentication:MetadataAddress"]!;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Authentication:ValidIssuer"]
        };
    });
//.AddJwtBearer(options =>
// {
//     options.SaveToken = true;
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidIssuer = builder.Configuration["Authentication:ValidIssuer"],
//         ValidAudience = builder.Configuration["Authentication:Audience"],
//         ValidateLifetime = true,
//         ClockSkew = new TimeSpan(0, 0, 5)
//     };
// });

var authenticationBaseUrl = new Uri(builder.Configuration["Keycloak:BaseUrl"] ?? throw new InvalidDataException("Keycloak URL not set."));
builder.Services.AddHttpClient(AuthenticationConstants.KeycloakHttpClient).ConfigureHttpClient(c => c.BaseAddress = authenticationBaseUrl);
builder.Services.AddAuthorization();

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddDbContext<FstDataDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DataConnection")));
builder.Services.AddScoped<IFstDataDbContext>(provider => provider.GetService<FstDataDbContext>() ?? throw new Exception("No Data DbContext configured"));

builder.Services.AddDbContext<FstAppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("AppConnection")));
builder.Services.AddScoped<IFstAppDbContext>(provider => provider.GetService<FstAppDbContext>() ?? throw new Exception("No App DbContext configured"));

builder.Services.AddAutoMapper(typeof(Program), typeof(SpellProfile));

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<ISourceService, SourceService>();
builder.Services.AddScoped<ISpellService, SpellService>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    await app.SeedDataAsync();
}

app.UseExceptionHandler();

app.UseCors(options =>
{
    options.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();