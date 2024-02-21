import Image from "next/image"

export default async function UserAvatar({size}: { size: number, userEmail: string }) {
  // const { userEmail } = props;

  return (
    <Image
      width={size}
      height={size}
      alt="avatar"
      // src={user.avatarUrl}
      src="/avatar.png"
      className="rounded-full mr-1 mt-0.5"
    />
  );
}