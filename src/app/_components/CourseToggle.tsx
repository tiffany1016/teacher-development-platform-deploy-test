"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {Button} from "@/components/ui/button";
import { INDIGO,PINK } from "@/lib/constants";
import CourseDialog from "@/app/_components/CourseDialog";
type CourseToggleProps={
  topic:string,
  courses:{name:string,series:string,teacher:string,type:string,topic:string,time:Date}[],
  color:string,
}
export default function AccordionDemo({topic,courses,color}:CourseToggleProps) {
  const [open,setOpen]=useState(false);
  const handleClick=()=>{
    setOpen(true);
  }
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div style={{borderColor:color,borderWidth:4}} className="grid rounded-3xl w-full content-center pr-2">
            <AccordionTrigger className="">
              <div className="grid ml-4 mr-2">
                <p className="text-black text-xl">主題一</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="ml-4">
                {courses.map((course)=>(
                  <>
                    <Button key={course.name} style={{backgroundColor:color}} onClick={handleClick}>
                      {course.name}
                    </Button>
                    <CourseDialog open={open} onClose={()=>setOpen(false)} courseInfo={course}/>
                  </>
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}
