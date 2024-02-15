import { getCourse } from "./actions";
import Header from "@/components/Header";
async function CourseHistory() {
  const username="Susan";
  const course=await getCourse(username);
  return (
    <>
      <Header username={username}/>
      
    </>
  );
}
export default CourseHistory;
