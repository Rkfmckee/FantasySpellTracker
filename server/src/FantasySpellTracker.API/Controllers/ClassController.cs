using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClassController(IMapper mapper, IClassService classService) : ControllerBase
{
    [HttpGet("Spell")]
    [ProducesResponseType(typeof(ClassViewModel[]), StatusCodes.Status200OK)]
    public async Task<ActionResult<ClassViewModel[]>> GetSpellcastingClasses()
    {
        return Ok(mapper.Map<ClassViewModel[]>(await classService.GetSpellcastingClassesAsync()));
    }
}
