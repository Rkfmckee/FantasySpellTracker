using AutoMapper;
using FST.API.ViewModels.Authentication;
using FST.Services.DTOs.Authentication;

namespace FST.API.MappingProfiles.Authentication;

public class LoginProfile : Profile
{
    public LoginProfile()
    {
        CreateMap<LoginViewModel, LoginDto>();
    }
}
