"use client";

import { Avatar } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  AvatarFallback,
  AvatarImage,
  Input,
  Button,
} from "../../../components/ui";
import { UserIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "../../../components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  UpdateUserScheme,
} from "../validation/update-user-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { ClipLoader } from "react-spinners";
import {
  useDeleteAccountMutation,
  useGetMyInfoQuery,
  useUpdateMyInfoMutation,
} from "../hooks";
import { useRouter } from "next/navigation";

const UserCard = () => {
  const router = useRouter();
  const [cookie] = useCookies(["user.info"]);

  const queryClient = useQueryClient();

  const { data: user, isLoading } = useGetMyInfoQuery(cookie["user.info"]?.id);
  const { mutate: updateMyInfoMutate } = useUpdateMyInfoMutation(queryClient);
  const { mutate: deleteAccountMutate } = useDeleteAccountMutation(queryClient);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserScheme>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleEditUser: SubmitHandler<UpdateUserScheme> = async (data) => {
    updateMyInfoMutate({
      userId: user.id,
      name: data.name,
      password: data.password,
    });
  };

  const handleDeleteAccount = () => {
    deleteAccountMutate(user.id);
    router.push("/login");
  };

  if (isLoading)
    return (
      <div className="w-full max-w-3xl mx-auto grid justify-center my-8">
        <ClipLoader
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>계정 설정</CardTitle>
        <CardDescription>
          사용자 정보를 관리하고 업데이트하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage
              sizes="32"
              src={user?.profileImage ?? undefined}
              alt="user's profile image"
            />
            <AvatarFallback>
              <UserIcon className="text-zinc-400" size={32} />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">유저명</Label>
            <Input
              id="username"
              defaultValue={user?.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="profileImage">프로필 이미지</Label>
            <Input id="profileImage" type="file" className="mt-1" disabled />
          </div>
          <div className="flex mt-2 justify-between">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              회원 탈퇴
            </Button>
            <Button onClick={handleSubmit(handleEditUser)}>
              변경사항 저장
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { UserCard };
