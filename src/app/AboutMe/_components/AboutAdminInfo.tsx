import React from "react";
import { INDIGO } from "@/lib/constants";

function AboutAdminInfo() {
  return (
    <div className="w-3/4 px-8 flex gap-3 items-center text-center" style={{height: "70vh"}}>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-4" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">帳號管理</p>
        <a href="/AccountManage" className="underline">帳號列表</a>
        <a href="/TeacherHistory" className="underline">教師教學經歷表</a>
      </div>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-3" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">課程管理</p>
        <a href="/CourseHistory/ExportHistory" className="underline">教師修課紀錄</a>
        <a href="/LectureRecords" className="underline">基金會課程紀錄</a>
        <a href="/" className="underline">編輯課程地圖</a>
      </div>
      <div className="rounded-3xl border-2 h-full w-full p-4 flex-col flex gap-3" style={{borderColor: INDIGO, color: INDIGO}}>
        <p className="py-3 text-2xl">IDP管理</p>
        <a href="/MyIDP" className="underline">KIST教師IDP紀錄</a>
        <a href="/AboutMe" className="underline disabled">匯入IDP問題集</a>
      </div>
    </div>
  );
}

export default AboutAdminInfo;
