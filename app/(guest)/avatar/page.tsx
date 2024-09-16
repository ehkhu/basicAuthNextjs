import Image from "next/image";
import { revalidatePath } from "next/cache";
import { getCurrentUser, updateUser } from "@/lib/db";
import { AvatarUploader } from "@/components/ui/avatar-uploader";

export default async function Home() {
  const user = await getCurrentUser();

  async function saveAvatar(url: string) {
    "use server";
    await updateUser({ avatar: url });
    revalidatePath("/");
  }

  return (
    <main className="p-24 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold my-12">Welcome back, {user.name}</h1>
      <div className="flex flex-col items-center space-y-4">
        {user.avatar ? (
          <Image
            src={user.avatar}
            width={288}
            height={288}
            className="rounded-full"
            alt="Your avatar"
          />
        ) : (
          <div className="bg-gray-300 w-72 h-72 rounded-full" />
        )}
        <div className="flex items-center justify-center gap-x-4">
          <AvatarUploader onUploadSuccess={saveAvatar} />
        </div>
      </div>
    </main>
  );
}
