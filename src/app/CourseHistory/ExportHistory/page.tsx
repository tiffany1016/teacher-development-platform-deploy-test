import Selection from "./components/Select";
import {getTopics,getSeries,getYears} from "./components/actions";
export default async function ExportHistory(){
  const years=getYears();
  const topics=getTopics();
  const series=getSeries();
  return(
    <div className="grid h-full">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">匯出設定</p>
      </div>
      <div className="flex justify-self-center gap-2 w-1/2">
        <div className="flex gap-1 items-center w-1/3">
          <p className="">匯出區間</p>
          <Selection selections={years}/>
        </div>
        <div className="flex gap-1 items-center w-1/3">
          <p className="">課程類別</p>
          <Selection selections={topics}/>
        </div>
        <div className="flex gap-1 items-center w-1/3">
          <p className="">活動系列</p>
          <Selection selections={series}/>
        </div>
      </div>
      <div className="flex w-5/6 h-full justify-self-center mt-8 gap-4">
        
      </div>
    </div>
  );
}