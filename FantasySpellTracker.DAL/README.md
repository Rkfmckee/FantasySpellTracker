When managing migrations, append `-StartupProject FantasySpellTracker.Api` so the DbContext can have dependencies injected from the API project.
Also, set the Default Project in Package Manager Console to `FantasySpellTracker.Dal`
- `Add-Migration MigrationName -StartupProject FantasySpellTracker.Api`
- `Remove-Migration -StartupProject FantasySpellTracker.Api`
- `Update-Database -StartupProject FantasySpellTracker.Api`