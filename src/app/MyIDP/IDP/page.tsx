'use client'
import {Button} from "@/components/ui/button";
import { INDIGO, LIGHT_BLUE, LIGHT_GREY, WHITE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { newSection, Cell } from "./_components/utils";
import { BasicButton } from "@/app/_components/BasicButton";

export default function IDPEdit(){
  const [data,setData] = useState<Cell[][]>([]);
  const [selected,setSelected] = useState<string[]>([]);

  const handleChecked = (id:string) => {
    if (selected.includes(id)) {
      const index = selected.indexOf(id);
      setSelected(selected.filter((_id) => _id != id));
    }
    else {
      setSelected([...selected,id])
    }
  };

  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">IDP</p>
      </div>
      <BasicButton text="addSection" dark={false} width="100px" onClick={()=>{setData(newSection(data,0))}} />
      <table>
        <tbody>
          {data.length>0 && data.map((row,i)=>(
            <tr key={"row"+i}>
              {row.length>0 && row.map((cell,j)=>(
                <td key={"cell"+j} className="px-2 py-1 justify-self-center" style={{border: "2px solid white",backgroundColor: selected.includes(cell.id)?"white":LIGHT_GREY}} colSpan={2}>
                  <div className="flex items-end" onClick={() => handleChecked(cell.id)}>
                    {/* <input type="checkbox" onChange={() => handleChecked(cell.id)} /> */}
                    {cell.content}
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row">Chris</th>
            <td colSpan={2} rowSpan={2}>HTML tables</td>
            <td>22</td>
            <td colSpan={2}>HTML tables</td>
          </tr>
          <tr>
            <th scope="row">Chris</th>
            <td>22</td>
            <td colSpan={2}>HTML tables</td>
          </tr>
        </tbody>
        {/* <tfoot>
          <tr>
            <th scope="row" colSpan={2}>Average age</th>
            <td>33</td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
}