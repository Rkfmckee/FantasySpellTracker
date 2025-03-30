namespace FST.API.ViewModels.Authentication;

public class UserViewModel(string userName)
{
    public string UserName { get; set; } = userName;
}
