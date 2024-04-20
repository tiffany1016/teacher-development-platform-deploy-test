import { Class, columns } from "./components/Columns";
import { DataTable } from "./components/data-table";
import Selection from "./components/Select";
import {getTypes,getSeries,getYears,getData} from "./components/actions";
import {Button} from "@/components/ui/button";
import { ADMIN, INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
import { auth } from "@/lib/auth";
export default async function MyLectureHistory(){
  const username="甲老師";
  const years=getYears();
  const types=getTypes();
  const series=getSeries();
  const data=getData();
  const session = await auth();
  const authority = session?.user?.authority;
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">{authority!==ADMIN ? "我的" : "教師"}講師紀錄</p>
      </div>
      <SelectAndData years={years} types={types} series={series} data={data} username={username}/>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}