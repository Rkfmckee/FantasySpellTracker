import { z } from "zod";

export const AuthTokenSchema = z.object({
    access: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;
