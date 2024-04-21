import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useRecord() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postRecord = async ({
    studentId,
    courseId,
    title,
    discription,
    link,
    publicToEveryone,
  }: {
    studentId: string,
    courseId: string,
    title: string,
    discription?: string,
    link?: string,
    publicToEveryone?: boolean,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "POST",
      body: JSON.stringify({
        studentId,
        courseId,
        title,
        discription,
        link,
        publicToEveryone,
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
  const updateRecord = async ({
    studentId,
    courseId,
    title,
    discription,
    link,
    publicToEveryone,
  }: {
    studentId: string,
    courseId: string,
    title?: string,
    discription?: string,
    link?: string,
    publicToEveryone?: boolean,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "PUT",
      body: JSON.stringify({
        studentId,
        courseId,
        title,
        discription,
        link,
        publicToEveryone,
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
  const deleteRecord = async ({
    studentId,
    courseId,
  }: {
    studentId: string,
    courseId: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/courseRecord", {
      method: "DELETE",
      body: JSON.stringify({
        studentId,
        courseId,
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
    postRecord,
    updateRecord,
    deleteRecord,
    loading,
  };
}
