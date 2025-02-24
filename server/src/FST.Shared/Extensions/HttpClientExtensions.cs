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

    public static async Task<T> PostAsync<T>(this HttpClient httpClient, string url, object? body = null)
    {
        var response = await httpClient.PostAsync(url, body?.ToHttpJson());
        if (!response.IsSuccessStatusCode) throw new Exception(await response.Content.ReadAsStringAsync());

        var content = await response.Content.ReadFromJsonAsync<T>();
        if (content == null) throw new InvalidDataException();

        return content;
    }

    public static async Task PostAsync(this HttpClient httpClient, string url, object? body = null)
    {
        var response = await httpClient.PostAsync(url, body?.ToHttpJson());
        if (!response.IsSuccessStatusCode) throw new Exception(await response.Content.ReadAsStringAsync());
    }
}
