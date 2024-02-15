import { getCourse } from "./actions";
import {Button} from "@/components/ui/button";
import Header from "@/components/Header";
async function CourseHistory() {
  const username="Susan";
  const course=await getCourse(username);
  return (
    <>
      <div className="grid justify-center mt-14">
        <p className="text-3xl text-[#013E6E]">我的修課紀錄</p>
        <Button
          className="w-auto mt-4 bg-[#013E6E] text-white text-lg rounded-full hover:bg-slate-400 hover:text-black"
        >
          匯出修課紀錄
        </Button>
      </div>
    </>
  );
}
export default CourseHistory;
