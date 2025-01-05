using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.ViewModels.Read;

public class FilterViewModel
{
    [FromQuery]
    public required string FieldName { get; set; }

    [FromQuery]
    public required string Value { get; set; }
}

public class FilterValidator : AbstractValidator<FilterViewModel>
{
    public FilterValidator()
    {
        RuleFor(rr => rr.FieldName).NotEmpty();
        RuleFor(rr => rr.Value).NotEmpty();
    }
}
