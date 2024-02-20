import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type SelectionProps={
  selections:string[],
}
export default function Selection({selections}:SelectionProps) {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-2/3">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">全</SelectItem>
          {selections.map((selection)=>(
            <SelectItem value={selection} key={selection}>{selection}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
