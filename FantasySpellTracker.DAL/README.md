When managing migrations, append `-StartupProject FantasySpellTracker.API` so the DbContext can have dependencies injected from the API project.
Also, set the Default Project in Package Manager Console to `FantasySpellTracker.DAL`
- `Add-Migration MigrationName -StartupProject FantasySpellTracker.API`
- `Remove-Migration -StartupProject FantasySpellTracker.API`
- `Update-Database -StartupProject FantasySpellTracker.API`