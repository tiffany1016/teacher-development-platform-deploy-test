import { v4 as uuidv4 } from 'uuid';

export interface Cell {
    id: string,        // <time>
    type: string,      // 段落標題|文字|自由填答|單選題|多選題|勾選題|null
    bold: Boolean,     // true|false
    color: string,     // light|dark
    history: string,   // <對應"歷史填答"資料id>
    more: string,      // <"更多"內容>
    size: string,      // L|M|S
    content: string,   // <附屬資料>
    rowSpan: string,   // <寬>|full
    colSpan: string,   // <高>|full
}

const initCell = {
    id: "",
    type: "文字",     
    bold: false,    
    color: "light",   
    history: "",     
    more: "",      
    size: "S",    
    content: ".", 
    rowSpan: "1",
    colSpan: "1"
};
let nullCell = {
    id: "",
    type: "null",     
    bold: false,    
    color: "light",   
    history: "",     
    more: "",      
    size: "S",    
    content: ".", 
    rowSpan: "1",
    colSpan: "1"
};
const sectionCell = {
    id: "",
    type: "段落標題",     
    bold: true,    
    color: "dark",   
    history: "",     
    more: "",      
    size: "L",    
    content: "Part", 
    rowSpan: "full",
    colSpan: "1"
};
function newCell(type:string) {
    let cell:Cell = initCell;
    switch(type) {
        case "section":
            cell = sectionCell;
            break;
        case "null":
            cell = nullCell;
            break;
        default:
            break;
    }
    cell.id = uuidv4();
    return JSON.parse(JSON.stringify(cell));
}
/* 
段落標題(文字:"") 
文字(文字:"") 
自由填答(提示文字:"") 
單選題(選項:["",]) 
多選題(選項:["",]) 
勾選題(文字:"")
*/
// add in front of #index
export function newSection(data:Cell[][], index:number) {
    const _firstRow:Cell[] = [(newCell("section")),(newCell("null")),(newCell("section")),(newCell("null"))];
    data = [...data,_firstRow];
    Array.from(Array(3)).forEach(() => {
        const _row:Cell[] = [];
        Array.from(Array(4)).forEach(() => {
            _row.push(newCell("init"));
        });
        data = [...data,_row];
    })
    return data;
}
export function addRow(data:Cell[][], index:number) {
    const cols = data[0].length;
    const _row:Cell[] = [];
    Array.from(Array(cols)).forEach(() => {
        _row.push(newCell("init"));
    });
    return [...data,_row];
}
export function delRow(data:Cell[][], index:number) {

    return data;
}
export function addCol(data:Cell[][], index:number) {
    
    return data;
}
export function delCol(data:Cell[][], index:number) {

    return data;
}