import {getData} from "./components/actions";
import SelectAndData from "./components/SelectAndTable";
export default async function CourseMap(){
  const username="甲老師";
  const data=getData(username);
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">課程地圖</p>
      </div>
      <SelectAndData data={data}/>
    </div>
  );
}