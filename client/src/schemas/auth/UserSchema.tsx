import { z } from "zod";

export const UserSchema = z.object({
    userName: z.string(),
});

export type User = z.infer<typeof UserSchema>;
