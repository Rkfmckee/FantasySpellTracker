import { z, ZodType } from "zod";

export const ReadResponseSchema = <TDataType extends ZodType>(
    dataType: TDataType
) =>
    z.object({
        currentPageData: z.array(dataType),
        totalRecords: z.number(),
    });

type ReadResponseType<TDataType extends ZodType> = ReturnType<
    typeof ReadResponseSchema<TDataType>
>;

export type ReadResponse<TData> = z.infer<ReadResponseType<ZodType<TData>>>;
