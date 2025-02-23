using Newtonsoft.Json;

namespace FST.Services.DTOs.Authentication;

public class AuthRequestDto(string clientId, string clientSecret, LoginDto login)
{
    [JsonProperty(PropertyName = "client_id")]
    public string ClientId { get; set; } = clientId;

    [JsonProperty(PropertyName = "client_secret")]
    public string ClientSecret { get; set; } = clientSecret;

    [JsonProperty(PropertyName = "grant_type")]
    public string GrantType => "password";

    public string Username { get; set; } = login.Username;
    public string Password { get; set; } = login.Password;
}
