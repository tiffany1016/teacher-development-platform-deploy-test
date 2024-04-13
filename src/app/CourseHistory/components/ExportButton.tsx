"use client";
import {Button} from "@/components/ui/button";
import useCourse from "@/app/hooks/useCourse";
import useMap from "@/app/hooks/useMap";
import useUsers from "@/app/hooks/useUsers";
import { useRouter } from 'next/navigation';
export default function CourseDialog() {
  const router=useRouter();
  const {postCourse,updateCourse,deleteCourse}=useCourse();
  const {postMap,updateMap,deleteMap}=useMap();
  const handleClick=async()=>{
    //TODO
    await postCourse({
      year:2024,
      series:"共識營",
      courseId:"1-4-1A",
      name:"新進教師工作坊",
      teacherId:"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      typeId:"A1",
    });
    // await postMap({
    //   id:"A1",
    //   bigCategory:"領導力",
    //   middleCategory:"教練",
    //   smallCategory:"A",
    // })
    // console.log("redirect");
    // router.push("/CourseHistory/ExportHistory");
  }
  return (
    <>
      <Button
        className="justify-self-center w-36 mt-4 bg-[#013E6E] text-white text-lg rounded-full hover:bg-slate-400 hover:text-black"
        onClick={handleClick}
      >
        匯出修課紀錄
      </Button>
    </>
  );
}