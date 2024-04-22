import { R } from 'react-flaticons';
import { v4 as uuidv4 } from 'uuid';

export interface Cell {
    id: string,        // <time>
    type: string,      // 段落標題|文字|自由填答|單選題|勾選題|null
    bold: boolean,     // true|false
    color: string,     // light|dark
    history: string,   // <對應"歷史填答"資料id>
    more: string,      // <"更多"內容>
    size: number,      // "10px"(L)|(M)|(S)
    content: string,   // <附屬資料>
    rowSpan: string,   // <寬>|full
    colSpan: string,   // <高>|full
    simplifiedVersion: boolean,   // <精簡版>
}

export const initCell = {
    id: "",
    type: "文字",     
    bold: false,    
    color: "light",   
    history: "",     
    more: "",      
    size: 15,    
    content: "內容", 
    rowSpan: "1",
    colSpan: "1",
    simplifiedVersion: false,
};
let nullCell = {
    id: "",
    type: "null",     
    bold: false,    
    color: "light",   
    history: "",     
    more: "",      
    size: 15,    
    content: "", 
    rowSpan: "1",
    colSpan: "1",
    simplifiedVersion: false,
};
const sectionCell = {
    id: "",
    type: "段落標題",     
    bold: true,    
    color: "dark",   
    history: "",     
    more: "",      
    size: 18,    
    content: "Part", 
    rowSpan: "1",
    colSpan: "full",
    simplifiedVersion: false,
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
export function newSection(data:Cell[][], selected:string[]) {
    const _firstRow:Cell[] = [(newCell("section")),(newCell("null")),(newCell("null")),(newCell("null"))];
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
export function addRow(data:Cell[][], selected:string[]) {
    const cols = (data[0].length===0)?4:data[0].length;
    const _row:Cell[] = [];
    Array.from(Array(cols)).forEach(() => {
        _row.push(newCell("init"));
    });
    return [...data,_row];
}
export function delRow(data:Cell[][], selected:string[]) {

    return data;
}
export function addCol(data:Cell[][], selected:string[]) {
    
    return data;
}
export function delCol(data:Cell[][], selected:string[]) {

    return data;
}
export function updateCell(data:Cell[][], id:string, newCell:Cell) {
    return data.map((row)=>(
        row.map((cell) => (
        cell.id === id ? newCell : {...cell}
        ))
    ))
}

export interface cellIndex {
    id: string;
    i: number;
    j: number;
};
// function inARow(data:Cell[][],ids:string[]) {
//     const cellIndexes = getIndexes(data,ids);
//     console.log(cellIndexes);
//     const row = cellIndexes[0].i;
//     cellIndexes.forEach(cellIndex => {
//         if (cellIndex.i !== row) {
//             return false;
//         }
//     });
//     return true;
// }
export function checkInARange(data:Cell[][],ids:string[]) {
    const {indexes, minI, maxI, minJ, maxJ} = getIndexes(data,ids);
    let inARange = true;
    let error = "";
    for (let i=minI; i<=maxI; i++) {
        for (let j=minJ; j<=maxJ; j++) {
            if (!ids.includes(data[i][j].id)) {
                inARange = false;
                error = "合併的儲存格需連續";
            }
        }
    }
    if (inARange && maxI+1<data.length) {
        for (let j=minJ; j<=maxJ; j++) {
            if (data[maxI+1][j].type === "null") {
                inARange = false;
                error = "儲存格合併衝突";
            }
        }
    }
    if (inARange && maxJ+1<data[0].length) {
        for (let i=minI; i<=maxI; i++) {
            if (data[i][maxJ+1].type === "null") {
                inARange = false;
                error = "儲存格合併衝突";
            }
        }
    }
    return {inARange, rowSpan: maxI-minI+1, colSpan: maxJ-minJ+1, leftTopIndex: indexes[0], error};
}
export function setToNullThenSpan(data:Cell[][], rowSpan: number,colSpan: number, leftTopIndex: cellIndex) {
    const fromI = leftTopIndex.i, fromJ = leftTopIndex.j;
    const toI = fromI+rowSpan, toJ = fromJ+colSpan; 
    return data.map((row,i)=>(
        row.map((cell,j) => (
            (i>=fromI && i<toI && j>=fromJ && j<toJ) ? ((i===fromI && j===fromJ) ? {
                ...cell,
                rowSpan: (rowSpan).toString(),
                colSpan: (colSpan).toString()
            } : {
                id: cell.id,
                type: "null",     
                bold: false,    
                color: "light",   
                history: "",     
                more: "",      
                size: 15,    
                content: "", 
                rowSpan: "1",
                colSpan: "1",
                simplifiedVersion: false,
            }) : {...cell}
        ))
    ));
}
export function getIndexes(data:Cell[][],ids:string[]) {
    let indexes:cellIndex[] = [];
    let minI = data.length, maxI = 0;
    let minJ = data.length, maxJ = 0; 
    data.forEach((row,i) => {
        row.forEach((cell,j) => {
            if (ids.includes(cell.id)) {
                indexes = [...indexes,{id:cell.id, i, j}]
                minI = Math.min(i,minI);
                minJ = Math.min(j,minJ);
                maxI = Math.max(i,maxI);
                maxJ = Math.max(j,maxJ);
            }
        })
    });
    indexes.sort(function(a, b) {
        if (a.i !== b.i) {
            return a.i - b.i;
        }
        return a.j - b.j;
    });
    return {indexes,minI,maxI,minJ,maxJ};
}