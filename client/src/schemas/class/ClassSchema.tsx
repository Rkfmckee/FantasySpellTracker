import { z } from "zod";

export const ClassSchema = z.object({
    classId: z.number(),
    className: z.string(),
    optional: z.boolean(),
});

export type Class = z.infer<typeof ClassSchema>;
