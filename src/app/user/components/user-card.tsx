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
  CardFooter,
  Button,
} from "../../../components/ui";
import { UserIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "../../../components/ui/label";
import { useState } from "react";

const UserCard = ({ user }: { user: User }) => {
  // const [formData, setFormData] = useState({name:user.name,password })

  const handleEditUser = async () => {};

  const handleDeleteUser = async () => {};

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
              src={user?.profileImage ?? undefined}
              alt={user?.name}
            />
            <AvatarFallback>
              <UserIcon className="text-zinc-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <Separator className="my-6" />

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">유저명</Label>
            <Input id="username" defaultValue={user?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <Input id="password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input id="confirmPassword" type="password" />
          </div>

          <div>
            <Label htmlFor="profileImage">프로필 이미지</Label>
            <Input id="profileImage" type="file" className="mt-1" disabled />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex mt-2 justify-between">
        <Button variant="destructive">회원 탈퇴</Button>
        <Button>변경사항 저장</Button>
      </CardFooter>
    </Card>
  );
};

export { UserCard };
