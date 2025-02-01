using AutoMapper;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.Services.MappingProfiles;

public class SpellProfile : Profile
{
    public SpellProfile()
    {
        CreateMap<Spell, SpellDto>();
    }
}
