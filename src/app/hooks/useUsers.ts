import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from 'swr';
export default function useUsers() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  
  const getUser = async({
    email,
    mobile,
  }:{
    email?:string,
    mobile?:string,
  })=>{
    setLoading(true);
    let queryParam = email ? `email=${encodeURIComponent(email)}` : `mobile=${encodeURIComponent(mobile!)}`;
    const res=await fetch(`/api/users?${queryParam}`,{
      method: "GET",
    })
    .then(res => {
      if (!res.ok) { // Check if the response status code is not okay
        console.error('Server responded with a non-200 status:', res.status);
        return res.text().then(text => { throw new Error(text) }); // Throw an error with the response text (or part of it)
      }
      return res.json(); // Parse JSON only if response is okay
    })
    .then((data) => {
      setData(data);
      setLoading(false);
      return data;
    })
    return res;
  };
  // const getUserByMobile = async({
  //   mobile,
  // }:{
  //   mobile:string,
  // })=>{
  //   setLoading(true);
    
  //   const res=await fetch(`/api/users`,{
  //     method: "GET",
  //   })
  //   .then(res => {
  //     if (!res.ok) { // Check if the response status code is not okay
  //       console.error('Server responded with a non-200 status:', res.status);
  //       return res.text().then(text => { throw new Error(text) }); // Throw an error with the response text (or part of it)
  //     }
  //     return res.json(); // Parse JSON only if response is okay
  //   })
  //   .then((data) => {
  //     setData(data);
  //     setLoading(false);
  //     return data;
  //   })
  //   return res;
  // };
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
        mobile:phoneNumber,
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
    getUser,
    // getUserByMobile,
    postUser,
    updateUser,
    loading,
  };
}
