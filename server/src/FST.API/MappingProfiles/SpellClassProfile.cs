using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.API.MappingProfiles;

public class SpellClassProfile : Profile
{
    public SpellClassProfile()
    {
        CreateMap<SpellClassDto, SpellClassViewModel>();
    }
}
