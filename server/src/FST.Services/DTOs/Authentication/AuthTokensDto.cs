using System.Text.Json.Serialization;

namespace FST.Services.DTOs.Authentication;

public class AuthTokensDto
{
    [JsonPropertyName("access_token")]
    public string? AccessToken { get; set; }

    [JsonPropertyName("refresh_token")]
    public string? RefreshToken { get; set; }
}
