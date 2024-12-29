namespace FantasySpellTracker.Shared.Extensions;
public static class GenericExtensions
{
    public static T? DeepCopy<T>(this T input)
    {
        var type = input?.GetType();
        var properties = type?.GetProperties();
        if (type == null || properties == null || properties.Length == 0) return default;

        var clonedObj = (T?)Activator.CreateInstance(type);

        foreach (var property in properties)
        {
            if (property.CanWrite)
            {
                var value = property.GetValue(input);
                if (value == null) continue;

                if (value.GetType().IsClass && (value.GetType().FullName?.StartsWith("System.") != true))
                {
                    property.SetValue(clonedObj, DeepCopy(value));
                }
                else
                {
                    property.SetValue(clonedObj, value);
                }
            }
        }

        return clonedObj;
    }
}
