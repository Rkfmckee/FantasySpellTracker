using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.API.MappingProfiles;

public class SpellProfile : Profile
{
    public SpellProfile()
    {
        CreateMap<SpellDto, SpellViewModel>();
    }
}
