import Image from "next/image"

export default async function UserAvatar(props: { userEmail: string }) {
  // const { userEmail } = props;

  return (
    <Image
      width={24}
      height={24}
      alt="avatar"
      // src={user.avatarUrl}
      src="/avatar.png"
      className="w-6 h-6 rounded-full mr-1 mt-0.5"
    />
  );
}