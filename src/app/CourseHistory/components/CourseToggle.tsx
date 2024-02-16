import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { INDIGO,PINK } from "@/lib/constants";
import CourseDialog from "./CourseDialog";
type CourseToggleProps={
  topic:string,
  courses:{name:string,series:string,teacher:string,type:string,topic:string,time:Date}[],
  color:string,
}
export default function AccordionDemo({topic,courses,color}:CourseToggleProps) {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <div style={{borderColor:color,borderWidth:4}} className="grid rounded-3xl w-full content-center pr-2">
            <AccordionTrigger className="">
              <div className="grid ml-4 mr-2">
                <p className="text-black text-xl">{topic}</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid ml-4 gap-2">
                {courses.map((course)=>(
                  <div key={course.name}>
                    <CourseDialog courseInfo={course} color={color}/>
                  </div>
                  
                ))}
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}
