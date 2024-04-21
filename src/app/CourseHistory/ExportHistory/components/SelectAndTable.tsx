"use client";
import {useState} from 'react';
import { Class, columns } from "./Columns";
import { DataTable } from "./data-table";
import Selection from "./Select";
import {Button} from "@/components/ui/button";
import { INDIGO } from "@/lib/constants";
type ExportHistoryProps={
  years:string[],
  types:string[],
  topics:string[],
  series:string[],
  data: {
    type: string;
    topic: string;
    name: string;
    time: string;
    teacher: string;
    series: string;
}[],
}
export default function SelectAndData({years,types,topics,series,data}:ExportHistoryProps){
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedSeries, setSelectedSeries] = useState("all");
  // Handler function for year selection change
  const handleYearChange = (value:string) => {
    setSelectedYear(value);
  };

  // Handler function for topic selection change
  const handleTypeChange = (value:string) => {
    setSelectedType(value);
  };

  // Handler function for topic selection change
  const handleTopicChange = (value:string) => {
    setSelectedTopic(value);
  };

  // Handler function for series selection change
  const handleSeriesChange = (value:string) => {
    setSelectedSeries(value);
  };

  const dataToShow=data.filter((d)=>(
    (d.time===selectedYear||selectedYear==="all")&&(d.type===selectedType||selectedType==="all")&&(d.topic===selectedTopic||selectedTopic==="all")&&(d.series===selectedSeries||selectedSeries==="all")
  ));
  return(
    <>
      <div className="flex justify-center gap-1">
        <div className="flex gap-1 items-center w-1/5">
          <p className="">匯出區間</p>
          <Selection selections={years} onChange={handleYearChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">課程類別</p>
          <Selection selections={types} onChange={handleTypeChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">課程主題</p>
          <Selection selections={topics} onChange={handleTopicChange}/>
        </div>
        <div className="flex gap-1 items-center w-1/5">
          <p className="">活動系列</p>
          <Selection selections={series} onChange={handleSeriesChange}/>
        </div>
      </div>
      <div className="w-5/6 h-full justify-self-center mt-8">
        <DataTable columns={columns} data={dataToShow}/>
      </div>
    </>
  );
}