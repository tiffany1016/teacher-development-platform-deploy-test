import { Class, columns } from "./components/Columns";
import { DataTable } from "./components/data-table";
import Selection from "./components/Select";
import {getYears,getData ,getSchool} from "./components/actions";
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
import SelectAndData from "./components/SelectAndTable";
export default async function ExportHistory(){
  const years=getYears();
  const data=getData();
  const teams=getSchool();
  return(
    <div className="grid h-full p-14">
      <div className="grid justify-center mt-14 mb-5">
        
      </div>
      <SelectAndData years={years} data={data} schools={teams}/>
      <div className="grid justify-items-center mt-5 ">
        <Button className="text-white rounded-full w-[10%] h-8" style={{backgroundColor:INDIGO}}>
          {"匯出"}
        </Button>
      </div>
    </div>
  );
}