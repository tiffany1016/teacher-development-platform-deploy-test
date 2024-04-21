import { Class, columns } from "./components/Columns";
import { DataTable } from "./components/data-table";
import Selection from "./components/Select";
import {getTypes,getSeries,getYears,getData, getTopics} from "./components/actions";
import {Button} from "@/components/ui/button";
import { ADMIN, INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
import { auth } from "@/lib/auth";
export default async function ExportHistory(){
  const years=getYears();
  const types=getTypes();
  const topics=getTopics();
  const series=getSeries();
  const data=getData();
  const session = await auth();
  return(
    <div className="grid h-full p-14">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">{session?.user?.authority!==ADMIN ? "我的" : "教師"}修課紀錄與匯出設定</p>
      </div>
      <SelectAndData years={years} types={types} series={series} data={data} topics={topics} />
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}