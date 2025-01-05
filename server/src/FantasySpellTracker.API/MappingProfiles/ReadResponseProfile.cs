using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.API.MappingProfiles;

public class ReadResponseProfile : Profile
{
    public ReadResponseProfile()
    {
        CreateMap<ReadResponseDto<SpellDto>, ReadResponseViewModel<SpellViewModel>>();
    }
}
