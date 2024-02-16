import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import { INDIGO,PINK } from "@/lib/constants";
type CourseToggleProps={
  topic:string,
  courses:{type:string,topic:string,name:string}[],
  color:string,
}
export default function AccordionDemo({topic,courses,color}:CourseToggleProps) {
  return (
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
                <Button key={course.name} style={{backgroundColor:color}}>
                  {course.name}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  )
}