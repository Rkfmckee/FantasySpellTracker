using AutoMapper;
using FantasySpellTracker.API.ViewModels.Read;
using FantasySpellTracker.Services.DTOs.Read;

namespace FantasySpellTracker.API.MappingProfiles.Read;

public class ReadRequestProfile : Profile
{
    public ReadRequestProfile()
    {
        CreateMap<ReadRequestViewModel, ReadRequestDto>();
        CreateMap<SpellReadRequestViewModel, SpellReadRequestDto>();
    }
}
