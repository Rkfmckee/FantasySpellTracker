using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SourceController(IMapper mapper, ISourceService sourceService) : ControllerBase
{
    [HttpGet("Spell")]
    [ProducesResponseType(typeof(SourceViewModel[]), StatusCodes.Status200OK)]
    public async Task<ActionResult<SourceViewModel[]>> GetSpellSources()
    {
        return Ok(mapper.Map<SourceViewModel[]>(await sourceService.GetSpellSourcesAsync()));
    }
}
