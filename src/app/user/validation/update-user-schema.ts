import { z } from "zod";

const updateUserSchema = z
  .object({
    name: z.string().min(3).max(10),
    password: z
      .union([z.string().length(0), z.string().min(3).max(30).optional()])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    confirmPassword: z
      .union([z.string().length(0), z.string().min(3).max(30).optional()])
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호와 동일하지 않습니다.",
    path: ["confirmPassword"],
  });

type UpdateUserScheme = z.infer<typeof updateUserSchema>;

export { updateUserSchema };
export type { UpdateUserScheme };
