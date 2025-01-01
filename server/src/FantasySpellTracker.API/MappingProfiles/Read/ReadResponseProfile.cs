using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.API.ViewModels.Read;
using FantasySpellTracker.Services.DTOs;
using FantasySpellTracker.Services.DTOs.Read;

namespace FantasySpellTracker.API.MappingProfiles.Read;

public class ReadResponseProfile : Profile
{
    public ReadResponseProfile()
    {
        CreateMap<ReadResponseDto<SpellDto>, ReadResponseViewModel<SpellViewModel>>();
    }
}
