import { z } from "zod";
import { SourceTypeSchema } from "./SourceTypeSchema";

export const SourceSchema = z.object({
    id: z.number(),
    title: z.string(),
    type: SourceTypeSchema,
});

export type Source = z.infer<typeof SourceSchema>;
