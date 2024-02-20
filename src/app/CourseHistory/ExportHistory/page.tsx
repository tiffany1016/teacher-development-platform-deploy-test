import { Class, columns } from "./components/Columns";
import { DataTable } from "./components/data-table";
import Selection from "./components/Select";
import {getTypes,getSeries,getYears,getData} from "./components/actions";
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
export default async function ExportHistory(){
  const years=getYears();
  const types=getTypes();
  const series=getSeries();
  const data=getData();
  return(
    <div className="grid h-full">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">匯出設定</p>
      </div>
      <SelectAndData years={years} types={types} series={series} data={data}/>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}