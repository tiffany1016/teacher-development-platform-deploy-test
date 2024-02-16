import { getCourse } from "./actions";
import {Button} from "@/components/ui/button";
import { PINK,ORANGE,GREEN,TIFFANY } from "@/lib/constants";
import CourseToggle from "@/app/_components/CourseToggle";
async function CourseHistory() {
  const username="Susan";
  const courses=await getCourse(username);

  return (
    <div className="grid h-full">
      <div className="grid justify-center mt-14">
        <p className="text-3xl text-[#013E6E]">我的修課紀錄</p>
        <Button
          className="justify-self-center w-36 mt-4 bg-[#013E6E] text-white text-lg rounded-full hover:bg-slate-400 hover:text-black"
        >
          匯出修課紀錄
        </Button>
      </div>
      <div className="flex w-5/6 h-full justify-self-center mt-8 gap-4">
        <div className="w-1/4 grid justify-items-center gap-2 content-start">
          <div style={{backgroundColor:PINK}} className="grid w-full h-10 rounded-full justify-items-center content-center mb-1">
            <p className="text-white text-xl">領導力</p>
          </div>
          <CourseToggle 
            topic={"主題A1"} 
            courses={courses.filter((course)=>(course.type==="領導力" && course.topic==="主題A1"))}
            color={PINK}
          />
          <CourseToggle 
            topic={"主題A2"} 
            courses={courses.filter((course)=>(course.type==="領導力" && course.topic==="主題A2"))}
            color={PINK}
          />
        </div>
        <div className="w-1/4 grid justify-items-center gap-2 content-start">
          <div style={{backgroundColor:ORANGE}} className="grid w-full h-10 rounded-full justify-items-center content-center mb-1">
            <p className="text-white text-xl">教學力</p>
          </div>
          <CourseToggle 
            topic={"主題B1"} 
            courses={courses.filter((course)=>(course.type==="教學力" && course.topic==="主題B1"))}
            color={ORANGE}
          />
        </div>
        <div className="w-1/4 grid justify-items-center gap-2 content-start">
          <div style={{backgroundColor:GREEN}} className="grid w-full h-10 rounded-full justify-items-center content-center mb-1">
            <p className="text-white text-xl">CC力</p>
          </div>
          <CourseToggle 
            topic={"主題C1"} 
            courses={courses.filter((course)=>(course.type==="CC力" && course.topic==="主題C1"))}
            color={GREEN}
          />
        </div>
        <div className="w-1/4 grid justify-items-center gap-2 content-start">
          <div style={{backgroundColor:TIFFANY}} className="grid w-full h-10 rounded-full justify-items-center content-center mb-1">
            <p className="text-white text-xl">DD力</p>
          </div>
          <CourseToggle 
            topic={"主題D1"} 
            courses={courses.filter((course)=>(course.type==="DD力" && course.topic==="主題D1"))}
            color={TIFFANY}
          />
        </div>
      </div>
    </div>
  );
}
export default CourseHistory;
