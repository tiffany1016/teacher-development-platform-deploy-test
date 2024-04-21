'use client'
import {Button} from "@/components/ui/button";
import { INDIGO, INDIGO_1, LIGHT_BLUE, LIGHT_GREY } from "@/lib/constants";
import { useEffect, useState } from "react";
import { newSection, Cell, addRow } from "./_components/utils";
import { BasicButton } from "@/app/_components/BasicButton";

export default function IDPEdit(){
  const [data,setData] = useState<Cell[][]>([]);
  const [selected,setSelected] = useState<string[]>([]);
  const type = ["文字","自由填答","單選題","多選題","勾選題"];

  const handleCheck = (id:string) => {
    if (id === "none") {
      setSelected([])
      return
    }
    if (id === "all") {
      let allId:string[] = [];
      data.forEach(row => {
        row.forEach(cell => {
          allId = [...allId,cell.id]
        })
      });
      setSelected(allId)
      return
    }
    if (selected.includes(id)) {
      const index = selected.indexOf(id);
      setSelected(selected.filter((_id) => _id != id));
    }
    else {
      setSelected([...selected,id])
    }
  };
  const handleSelect = (i:number, j:number, id:string, type:string) => {
    if(data[i][j].id !== id) {
      console.log("id error")
      return;
    }
    setData(data.map((row)=>(
      row.map((cell) => (
        cell.id === id ? {
          ...cell,
          type: type,
          content: ""
        } :
        {...cell}
      ))
    )));
  }
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">IDP</p>
      </div>
      <div className="flex justify-center gap-2 pb-2">
        <div className="flex gap-0.5"> 
          <BasicButton text="插入 列" onClick={()=>{setData(addRow(data,selected))}} />
          <BasicButton text="/欄" onClick={()=>{setData(addRow(data,selected))}} />
          <BasicButton text="/段落" onClick={()=>{setData(newSection(data,selected))}} />
        </div>
        <BasicButton text="全選" onClick={()=>{handleCheck("all")}} />
        <BasicButton text="取消選擇" onClick={()=>{handleCheck("none")}} />
      </div>
      <table>
        <tbody>
          {data.length>0 && data.map((row,i)=>(
            <tr key={"row"+i}>
              {row.length>0 && row.map((cell,j)=>(
                (cell.type!=="null" && <td key={"cell"+j} 
                  className="px-2 py-1 justify-self-center" 
                  style={{
                    border: "2px solid white",
                    backgroundColor: selected.includes(cell.id)?(cell.color==="dark"?INDIGO_1:"white"):(cell.color==="dark"?INDIGO:LIGHT_GREY),
                  }}
                    colSpan={cell.colSpan==="full"?data[0].length:parseInt(cell.colSpan)} 
                    rowSpan={parseInt(cell.rowSpan)}
                    >
                  <div className="flex items-center gap-2">
                    {cell.type!=="段落標題" && <div>
                      <input type="checkbox" checked={selected.includes(cell.id)} onChange={() => handleCheck(cell.id)} />
                      <select style={{fontSize: "12px"}} value={cell.type} onChange={(e)=> handleSelect(i,j,cell.id,e.target.value) }>
                        {type.map((t,k) => (
                          <option key={"type"+k} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>}
                    <div style={{color: (cell.color==="dark"?"white":"black"), fontSize: cell.size}}>
                      {cell.content}
                    </div>
                  </div>
                </td>)
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}