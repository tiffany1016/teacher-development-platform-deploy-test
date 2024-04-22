'use client'
import { INDIGO, INDIGO_1,  LIGHT_GREY } from "@/lib/constants";
import { useState } from "react";
import { newSection, Cell, addRow, updateCell, checkInARange, setToNullThenSpan, getIndexes } from "./_components/utils";
import { BasicButton } from "@/app/_components/BasicButton";
import { Pencil } from "react-flaticons";
import EditCellDialog from "./_components/EditCellDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea";
        

export default function IDPEdit(){
  const [data,setData] = useState<Cell[][]>([]);
  const [selected,setSelected] = useState<string[]>([]);
  const [editCellDialogOpen,setEditCellDialogOpen] = useState(false);
  const [editCellIndex,setEditCellIndex] = useState<number[]>([0,0]);
  const [preview,setPreview] = useState(true);
  const type = ["文字","自由填答","單選題","勾選題"];
  const textType = ["段落標題","文字","勾選題"];
  const selectType = ["單選題"];
  // 段落標題|文字|自由填答|單選題|勾選題|null

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
      setSelected(selected.filter((_id) => _id != id));
    }
    else {
      setSelected([...selected,id])
    }
  };
  const handleSelect = (type:string, cell:Cell) => {
    setData(updateCell(data,cell.id,{
      ...cell,
      type: type,
      content: (selectType.includes(type)?"[]":"")
    }));
  }
  const handleEdit = (i:number,j:number) => {
    setEditCellIndex([i,j]);
    setEditCellDialogOpen(true);
  }
  const handleCombine = () => {
    if (selected.length === 0) {
      alert("請選擇要合併的儲存格");
      return;
    }
    const {inARange,rowSpan,colSpan,leftTopIndex,error} = checkInARange(data,selected);
    if (!inARange) {
      alert(error);
      return;
    }
    handleCheck("none");
    setData(setToNullThenSpan(data, rowSpan,colSpan,leftTopIndex));
  }
  const handleColor = (newColor:string) => {
    if (selected.length > 1 || selected.length === 0) {
      alert("請選擇一個要更改顏色的儲存格")
      return;
    }
    const {indexes} = getIndexes(data,selected);
    setData(updateCell(data,selected[0],{
      ...data[indexes[0].i][indexes[0].j],
      color: newColor,
    }));
  }
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">IDP教師自我檢核</p>
      </div>
      <div className="flex justify-end w-full">
        {!preview && <div className="flex gap-3 pb-4 w-full h-fit">
          <div className="flex gap-0.5"> 
            <BasicButton text="插入 列" onClick={()=>{setData(addRow(data,selected))}} />
            <BasicButton text="/欄" />
            <BasicButton text="/段落" onClick={()=>{setData(newSection(data,selected))}} />
          </div>
          <div className="flex gap-0.5"> 
            <BasicButton text="刪除 列" onClick={()=>{}} />
            <BasicButton text="/欄" />
            <BasicButton text="/段落" onClick={()=>{}} />
          </div>
          <div className="flex gap-0.5"> 
            <BasicButton text="A+" onClick={()=>{}} />
            <BasicButton text="A-" onClick={()=>{}} />
            <BasicButton text="B" onClick={()=>{}} />
          </div>
          <div className="flex gap-0.5"> 
            <BasicButton text="深" onClick={()=>{handleColor("dark")}} />
            <BasicButton text="淺" onClick={()=>{handleColor("light")}} />
          </div>
          <BasicButton text="合併" onClick={()=>{handleCombine()}} />
          <BasicButton text="全選" onClick={()=>{handleCheck("all")}} />
          <BasicButton text="取消選擇" onClick={()=>{handleCheck("none")}} />
          <BasicButton text="console.log" onClick={()=>{console.log(data)}} />
        </div>}
        <div className="flex gap-2 pb-4 w-fit text-nowrap">
          <BasicButton text="簡易版" dark={true} size={16} height="30px" width="80px" onClick={()=>{}} />
          <BasicButton text="完整版" dark={true} size={16} height="30px" width="80px" onClick={()=>{setPreview(true)}} />
          {preview && <BasicButton text="編輯" dark={true} size={16} height="30px" width="65px" onClick={()=>{setPreview(false)}} />}
        </div>
      </div>
      
      <div className="overflow-x-auto" style={{width:"100%"}}>
        <table className="w-full">
          <tbody>
            {data.length>0 && data.map((row,i)=>(
              <>
                {/* 每個段落(section)前要留白 */}
                {row[0].type==="段落標題" && i>0 && <tr><td style={{height: "15px"}}></td></tr>}
                <tr key={"row"+i}>
                  {row.length>0 && row.map((cell,j)=>(
                    (cell.type!=="null" && <td key={"cell"+j} 
                      className="px-2 py-1 justify-self-center" 
                      style={{
                        border: "2px solid white",
                        borderTopRightRadius: (cell.type==="段落標題"?"10px":"0px"),
                        borderTopLeftRadius: (cell.type==="段落標題"?"10px":"0px"),
                        backgroundColor: selected.includes(cell.id)?(cell.color==="dark"?INDIGO_1:"white"):(cell.color==="dark"?INDIGO:LIGHT_GREY),
                      }}
                        colSpan={cell.colSpan==="full"?data[0].length:parseInt(cell.colSpan)} 
                        rowSpan={parseInt(cell.rowSpan)}
                      >
                      <div className="flex items-center gap-2">
                        {cell.type!=="段落標題" && !preview && <div className="flex"> {/* 若為"段落標題"or"預覽模式"，不顯示編輯類別選單"， */}
                          <input type="checkbox" checked={selected.includes(cell.id)} onChange={() => handleCheck(cell.id)} />
                          <select style={{fontSize: "12px"}} value={cell.type} onChange={(e)=> handleSelect(e.target.value,cell) }>
                            {type.map((t,k) => (
                              <option key={"type"+k} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>}
                        {!preview && <div className="rounded-full cursor-pointer hover:bg-neutral-200" onClick={()=>handleEdit(i,j)}>
                          <Pencil size={11} color="#9c9c9c" /> {/* 編輯icon */}
                        </div>}
                        <div className="w-full" style={{color: (cell.color==="dark"?"white":"black"), fontSize: cell.size}}>
                          {textType.includes(cell.type) && <div className="flex gap-1">
                            {cell.type==="勾選題" && <input type="checkbox"/>}
                            {cell.content}
                          </div>}
                          {selectType.includes(cell.type) && JSON.parse(cell.content).length>0 && 
                            <Select>
                              <SelectTrigger className="max-w-max h-min py-1 min-w-full">
                                <SelectValue placeholder={JSON.parse(cell.content)[0]??""} />
                              </SelectTrigger>
                              <SelectContent className="break-all max-w-screen-sm">
                                {JSON.parse(cell.content).map((option:string,i:number)=>(
                                  <>
                                    {option!=="" && <SelectItem key={"option"+i} value={option}>{option}</SelectItem>}
                                  </>
                                ))}
                              </SelectContent>
                            </Select>
                          }
                          {cell.type==="自由填答" && <Textarea className="w-full py-1 px-1" style={{height:"32px"}} placeholder={cell.content} />}
                        </div>
                      </div>
                    </td>)
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      {data.length>0 && <EditCellDialog data={data} cell={data[editCellIndex[0]][editCellIndex[1]]} open={editCellDialogOpen} setOpen={setEditCellDialogOpen} setData={setData} />}
    </div>
  );
}