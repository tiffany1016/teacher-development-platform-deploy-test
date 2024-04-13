import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useCourse() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postCourse = async ({
    year,
    series,
    courseId,
    name,
    teacherId,
    typeId,
  }: {
    year: number,
    series:string,
    courseId:string,
    name:string,
    teacherId:string,
    typeId:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/course", {
      method: "POST",
      body: JSON.stringify({
        year,
        series,
        courseId,
        name,
        teacherId,
        typeId,
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
  const updateCourse = async ({
    courseId,
    name,
    typeId,
  }: {
    courseId: string,
    name: string,
    typeId: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/course", {
      method: "PUT",
      body: JSON.stringify({
        courseId,
        name,
        typeId,
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
  const deleteCourse = async ({
    courseId,
  }: {
    courseId: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/course", {
      method: "DELETE",
      body: JSON.stringify({
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
    postCourse,
    updateCourse,
    deleteCourse,
    loading,
  };
}
