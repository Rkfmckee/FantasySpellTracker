using FantasySpellTracker.Shared.Extensions;
using System.Reflection.Emit;

namespace FantasySpellTracker.Shared.Helpers;

public static class EnumHelpers
{
    public static T GetEnumByDisplayName<T>(string displayName) where T : struct, Enum
    {
        return Enum.GetValues<T>().FirstOrDefault(sl => sl.GetDisplayName().ToLower().Contains(displayName.ToLower()));
    }

    public static T[] GetEnumsByDisplayNames<T>(params string[] displayNames) where T : struct, Enum
    {
        var values = new List<T>();

        foreach (var displayName in displayNames)
        {
            values.Add(Enum.GetValues<T>().FirstOrDefault(sl => sl.GetDisplayName().ToLower().Contains(displayName.ToLower())));
        }

        return values.ToArray();
    }

    public static TEnum Merge<TEnum>(this IEnumerable<TEnum> values)
        where TEnum : struct
    {
        TEnum merged = default;

        if (values != null)
        {
            var or = Operator<TEnum>.Or;
            foreach (var value in values)
            {
                merged = or(merged, value);
            }
        }

        return (TEnum)(object)merged;
    }

    public class Operator<T>
    {
        public static readonly Func<T, T, T> Or;

        static Operator()
        {
            var dn = new DynamicMethod("or", typeof(T),
                new[] { typeof(T), typeof(T) }, typeof(EnumHelpers));
            var il = dn.GetILGenerator();
            il.Emit(OpCodes.Ldarg_0);
            il.Emit(OpCodes.Ldarg_1);
            il.Emit(OpCodes.Or);
            il.Emit(OpCodes.Ret);
            Or = (Func<T, T, T>)dn.CreateDelegate(typeof(Func<T, T, T>));
        }
    }
}
