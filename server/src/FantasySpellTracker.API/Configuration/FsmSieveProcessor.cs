using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;

namespace FantasySpellTracker.API.Configuration;

public class FsmSieveProcessor(IOptions<SieveOptions> options) : SieveProcessor(options)
{
    //protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
    //{
    //    return mapper.ApplyConfigurationsFromAssembly(typeof(SpellSieve).Assembly);
    //}
}
