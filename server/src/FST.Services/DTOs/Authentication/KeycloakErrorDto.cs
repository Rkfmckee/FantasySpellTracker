using Newtonsoft.Json;

namespace FST.Services.DTOs.Authentication;

public class KeycloakErrorDto
{
    public string? Error { get; set; }

    [JsonProperty("error_description")]
    public string? ErrorDescription { get; set; }
}
