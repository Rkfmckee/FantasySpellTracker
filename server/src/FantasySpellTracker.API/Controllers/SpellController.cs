using AutoMapper;
using FantasySpellTracker.API.ViewModels;
using FantasySpellTracker.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace FantasySpellTracker.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SpellController(IMapper mapper, ISpellService spellService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(ReadResponseViewModel<SpellViewModel>), StatusCodes.Status200OK)]
    public async Task<ActionResult<ReadResponseViewModel<SpellViewModel>>> GetSpells([FromQuery] SieveModel sieveModel)
    {
        return Ok(mapper.Map<ReadResponseViewModel<SpellViewModel>>(await spellService.GetSpellsAsync(sieveModel)));
    }
}
