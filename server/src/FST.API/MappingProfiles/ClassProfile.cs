using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.API.MappingProfiles;

public class ClassProfile : Profile
{
    public ClassProfile()
    {
        CreateMap<ClassDto, ClassViewModel>();
    }
}
