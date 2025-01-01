using AutoMapper;
using FantasySpellTracker.DAL.Entities;
using FantasySpellTracker.Services.DTOs;

namespace FantasySpellTracker.Services.MappingProfiles;

public class SourceProfile : Profile
{
    public SourceProfile()
    {
        CreateMap<Source, SourceDto>();
    }
}
