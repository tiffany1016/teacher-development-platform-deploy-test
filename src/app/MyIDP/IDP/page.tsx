'use client'
import {Button} from "@/components/ui/button";
import { INDIGO, LIGHT_BLUE, LIGHT_GREY, WHITE } from "@/lib/constants";
import { useEffect, useState } from "react";
import { newSection } from "./_components/utils";

export default async function IDPEdit(){
  // const [data,setData] = useState(newSection([],0));

  const data = [["a","b","c","d","e","f"],
                ["2","3","6"],
                ["4","5","6"],
                ["2","3","6"],
                ["2","5","6"],
                ["2","3","4"],
                ["2","3","4"],
                ["4","5","6"],
                ["2","5","6"],
                ["2","5","6"]];
  const label = data[0];
  const content = data.slice(1);
  return(
    <div className="grid h-full p-16">
      <div className="grid justify-center mt-14 mb-5">
        <p className="text-3xl text-[#013E6E]">IDP</p>
      </div>
      <table bgcolor={LIGHT_GREY}>
        <caption>
          Front-end web developer course 2021
        </caption>
        <thead>
          <tr>
            {label.map((cell)=>(
                <th scope="col">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content.map((row)=>(
            <tr>
              {row.map((cell)=>(
                <td style={{border: "2px solid white"}} colSpan={2}>
                  <input type="checkbox" />
                  {cell}
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