import { Class, columns } from "./components/Columns";
import { DataTable } from "./components/data-table";
import Selection from "./components/Select";
import {getTypes,getSeries,getYears,getData} from "./components/actions";
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
export default async function ExportHistory(){
  const years=getYears();
  const topics=getTypes();
  const series=getSeries();
  const data=getData();
  const dataToShow=data.filter((d)=>(
    d.name===""
  ));
  return(
    <div className="grid h-full">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">匯出設定</p>
      </div>
      <div className="flex justify-center gap-1">
        <div className="flex gap-1 items-center w-1/5">
          <p className="">匯出區間</p>
          <Selection selections={years}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">課程類別</p>
          <Selection selections={topics}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">活動系列</p>
          <Selection selections={series}/>
        </div>
        <div className="flex items-center">
          <Button className="text-white rounded-full" style={{backgroundColor:INDIGO}}>
            {"搜尋"}
          </Button>
        </div>
      </div>
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={dataToShow}/>
      </div>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}