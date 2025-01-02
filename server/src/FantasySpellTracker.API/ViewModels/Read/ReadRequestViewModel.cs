using FluentValidation;

namespace FantasySpellTracker.API.ViewModels.Read;

public class ReadRequestViewModel
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}

public class ReadRequestValidator : AbstractValidator<ReadRequestViewModel>
{
    public ReadRequestValidator()
    {
        RuleFor(rr => rr.PageNumber).GreaterThanOrEqualTo(1);
        RuleFor(rr => rr.PageSize).GreaterThanOrEqualTo(1);
    }
}