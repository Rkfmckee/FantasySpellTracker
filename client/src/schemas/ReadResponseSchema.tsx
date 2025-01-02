import { z } from "zod";
import { SpellsSchema } from "./SpellSchema";

export const ReadResponseSchema = z.object({
    currentPageData: SpellsSchema,
    totalRecords: z.number(),
});
export type ReadResponse = z.infer<typeof ReadResponseSchema>;
