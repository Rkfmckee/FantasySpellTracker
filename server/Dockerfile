FROM mcr.microsoft.com/dotnet/aspnet:9.0 as base
WORKDIR /server

EXPOSE 3000
EXPOSE 3001

FROM mcr.microsoft.com/dotnet/sdk:9.0 as build
ARG BUILD_CONFIGURATION=Development
WORKDIR /src

COPY ["src/FantasySpellTracker.API/FantasySpellTracker.API.csproj", "src/FantasySpellTracker.API"]
COPY ["src/FantasySpellTracker.DAL/FantasySpellTracker.DAL.csproj", "src/FantasySpellTracker.DAL"]
COPY ["src/FantasySpellTracker.Services/FantasySpellTracker.Services.csproj", "src/FantasySpellTracker.Services"]
COPY ["src/FantasySpellTracker.Shared/FantasySpellTracker.Shared.csproj", "src/FantasySpellTracker.Shared"]

RUN dotnet restore "src/FantasySpellTracker.API/FantasySpellTracker.API.csproj"

COPY . .

WORKDIR /src/FantasySpellTracker.API
RUN dotnet build "src/FantasySpellTracker.API.csproj" -c $BUILD_CONFIGURATION -o /server/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Development
RUN dotnet publish "src/FantasySpellTracker.API.csproj" -c $BUILD_CONFIGURATION -o /server/publish /p:UseAppHost=false

FROM base as final
WORKDIR /server
COPY --from=publish /server/publish .

ENTRYPOINT [ "dotnet", "FantasySpellTracker.API.dll" ]