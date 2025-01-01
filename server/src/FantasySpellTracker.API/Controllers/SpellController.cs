using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.API.ViewModels.Read;
using FantasySpellTracker.Services.DTOs.Read;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SpellController(IMapper mapper, ISpellService spellService) : ControllerBase
{
    [HttpPost("Read")]
    [ProducesResponseType(typeof(ReadResponseViewModel<SpellViewModel>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ReadResponseViewModel<SpellViewModel>>> ReadSpells(ReadRequestViewModel readRequest)
    {
        var readRequestData = mapper.Map<ReadRequestDto>(readRequest);
        return Ok(mapper.Map<ReadResponseViewModel<SpellViewModel>>(await spellService.ReadSpellsAsync(readRequestData)));
    }
}
