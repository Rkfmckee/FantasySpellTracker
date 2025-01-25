import { z } from "zod";

export const SpellClassSchema = z.object({
    classId: z.number(),
    className: z.string(),
    optional: z.boolean(),
});

export type SpellClass = z.infer<typeof SpellClassSchema>;
