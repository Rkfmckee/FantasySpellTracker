using AutoMapper;
using FST.API.ViewModels.Authentication;
using FST.Services.DTOs.Authentication;

namespace FST.API.MappingProfiles.Authentication;

public class AuthTokensProfile : Profile
{
    public AuthTokensProfile()
    {
        CreateMap<AuthTokensDto, AuthTokensViewModel>();
    }
}
