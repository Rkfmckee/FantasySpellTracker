namespace FantasySpellTracker.Shared.Enums;

[Flags]
public enum DamageType
{
    None = 0,
    Bludgeoning = 1,
    Piercing = 2,
    Slashing = 4,
    Acid = 8,
    Cold = 16,
    Fire = 32,
    Force = 64,
    Lightning = 128,
    Necrotic = 256,
    Poison = 512,
    Psychic = 1024,
    Radiant = 2056,
    Thunder = 4096
}