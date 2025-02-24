using Newtonsoft.Json;
using System.Text;

namespace FST.Shared.Extensions;

public static class ObjectExtensions
{
    public static HttpContent? ToHttpJson(this object value)
    {
        return new StringContent(JsonConvert.SerializeObject(value), Encoding.UTF8, "application/json");
    }
}
