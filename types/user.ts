// types/user.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  image: z.string().nullable(),                 // null 가능
  createdAt: z.string().datetime(),             // ISO 문자열
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
});
export type User = z.infer<typeof UserSchema>;

export const CurrentUserResponseSchema = z.object({
  user: UserSchema.nullable(),                  // 미로그인 시 null일 수 있음
});
export type CurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;
