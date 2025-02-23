using System.Net.Http.Json;

namespace FST.Shared.Extensions;

public static class HttpClientExtensions
{
    public static async Task<T> PostEncodedAsync<T>(this HttpClient httpClient, string url, Dictionary<string, string> body)
    {
        var response = await httpClient.PostAsync(url, new FormUrlEncodedContent(body));
        if (!response.IsSuccessStatusCode) throw new Exception(await response.Content.ReadAsStringAsync());

        var content = await response.Content.ReadFromJsonAsync<T>();
        if (content == null) throw new InvalidDataException();

        return content;
    }
}
