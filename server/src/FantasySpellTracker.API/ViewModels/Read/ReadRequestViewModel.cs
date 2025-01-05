using FantasySpellTracker.Shared.Enums.Filter;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace FantasySpellTracker.API.ViewModels.Read;

public class ReadRequestViewModel
{
    [FromQuery]
    public FilterViewModel[]? Filters { get; set; }

    [FromQuery(Name = "sortName")]
    public string[]? SortPropertyNames { get; set; }

    [FromQuery]
    public SortOrder SortOrder { get; set; }

    [FromQuery]
    public int PageNumber { get; set; }

    [FromQuery]
    public int PageSize { get; set; }
}

public class ReadRequestValidator : AbstractValidator<ReadRequestViewModel>
{
    public ReadRequestValidator()
    {
        RuleFor(rr => rr.SortOrder).NotNull();
        RuleFor(rr => rr.PageNumber).GreaterThanOrEqualTo(1);
        RuleFor(rr => rr.PageSize).GreaterThanOrEqualTo(1);
    }
}