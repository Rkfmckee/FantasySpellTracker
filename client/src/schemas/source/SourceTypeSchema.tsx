import { z } from "zod";

export enum SourceType {
    Sourcebook,
    Adventure,
    Partnered,
}

export const SourceTypeSchema = z.nativeEnum(SourceType);
