import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useUsers() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const postUser = async ({
    username,
    email,
    phoneNumber,
    hashedPassword,
  }: {
    username:string,
    email:string,
    phoneNumber:string,
    hashedPassword:string,
  }) => {
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        phoneNumber,
        hashedPassword,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };
  const updateUser = async ({
    id,
    username,
    authority,
    disable,
    experience,
    hashedPassword,
  }: {
    id: string,
    username?:string,
    authority?:string,
    disable?:boolean,
    experience?:{
      startTime:string[],
      endTime:string[],
      school:string[],
      position:string[],
      subject:string[],
      role:string[],
      feature:string[],
    },
    hashedPassword?:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({
        id,
        username,
        authority,
        disable,
        experience,
        hashedPassword,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postUser,
    updateUser,
    loading,
  };
}
