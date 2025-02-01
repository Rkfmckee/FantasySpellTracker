import { z } from "zod";

export const ClassSchema = z.object({
    id: z.number(),
    name: z.string(),
});

export type Class = z.infer<typeof ClassSchema>;
