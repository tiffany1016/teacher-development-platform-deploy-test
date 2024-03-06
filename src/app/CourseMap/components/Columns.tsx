"use client"
import { ColumnDef } from "@tanstack/react-table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Class = {
  id: number,
  firstLevel:string,
  secondLevel:string,
  thirdLevel:string,
  courses: string[]
}

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "firstLevel",
    header: "大分類",
  },
  {
    accessorKey: "secondLevel",
    header: "中分類",
  },
  {
    accessorKey: "thirdLevel",
    header: "小分類",
  },
  {
    accessorKey: "courses",
    header: "開設課程",
    cell: ({ row }) => {
      return(
        <>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="h-6">{"展開 ("+row.original.courses.length+")"}</AccordionTrigger>
              <AccordionContent>
                {row.original.courses.map((course)=>(
                  <div className="py-1">{course}</div>)
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      );
    },
  },
]