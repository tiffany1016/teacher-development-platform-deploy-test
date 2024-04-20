import { object } from "zod";

const initCell = {
    id: "",           // <hashed-time>
    type: "文字",         // 段落標題|文字|自由填答|單選題|多選題|勾選題|null
    bold: false,      // true|false
    color: "light",   // light|dark
    history: "",      // <對應"歷史填答"資料id>
    more: "",         // <"更多"內容>
    size: "S",        // L|M|S
    content: ".",      // <附屬資料>
    rowSpan: 1,       // 寬
    colSpan: 1,       // 高
};
const nullCell = {
    id: "",           // <hashed-time>
    type: "null",         // 段落標題|文字|自由填答|單選題|多選題|勾選題|null
    bold: false,      // true|false
    color: "light",   // light|dark
    history: "",      // <對應"歷史填答"資料id>
    more: "",         // <"更多"內容>
    size: "S",        // L|M|S
    content: ".",      // <附屬資料>
    rowSpan: 1,       // 寬
    colSpan: 1,       // 高
};
const sectionCell = {
    id: "",           // <hashed-time>
    type: "段落標題",         // 段落標題|文字|自由填答|單選題|多選題|勾選題|null
    bold: true,      // true|false
    color: "dark",   // light|dark
    history: "",      // <對應"歷史填答"資料id>
    more: "",         // <"更多"內容>
    size: "L",        // L|M|S
    content: "Part",      // <附屬資料>
    rowSpan: "full",       // <寬>|full
    colSpan: "1",       // <高>|full
};
/* 
段落標題(文字:"") 
文字(文字:"") 
自由填答(提示文字:"") 
單選題(選項:["",]) 
多選題(選項:["",]) 
勾選題(文字:"")
*/
// add in front of #index
export function newSection(data:object[][], index:number) {
    const _firstRow:object[] = [sectionCell,nullCell,nullCell,nullCell];
    const _row:object[] = [initCell,initCell,initCell,initCell];
    return [_firstRow,_row,_row,_row];
}
export function addRow(data:object[][], index:number) {
    const cols = data[0].length;
    const _row:object[] = [];
    Array.from(Array(cols)).forEach(() => {
        _row.push(initCell);
    });
    return [...data,_row];
}
export function delRow(data:object[][], index:number) {

    return data;
}
export function addCol(data:object[][], index:number) {
    
    return data;
}
export function delCol(data:object[][], index:number) {

    return data;
}