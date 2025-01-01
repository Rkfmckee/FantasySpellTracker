using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.API.MappingProfiles;

public class SourceProfile : Profile
{
    public SourceProfile()
    {
        CreateMap<SourceDto, SourceViewModel>();
    }
}
