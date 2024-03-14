import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useMap() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postMap = async ({
    bigCategory,
    middleCategory,
    smallCategory,
  }: {
    bigCategory:string,
    middleCategory:string,
    smallCategory:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseMap", {
      method: "POST",
      body: JSON.stringify({
        bigCategory,
        middleCategory,
        smallCategory,
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
  const updateMap = async ({
    bigCategory,
    middleCategory,
    smallCategory,
  }: {
    bigCategory:string,
    middleCategory:string,
    smallCategory:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseMap", {
      method: "PUT",
      body: JSON.stringify({
        bigCategory,
        middleCategory,
        smallCategory,
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
  const deleteMap = async ({
    id
  }: {
    id:number,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseMap", {
      method: "DELETE",
      body: JSON.stringify({
        id
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
    postMap,
    updateMap,
    deleteMap,
    loading,
  };
}
