export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:"領導力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2024-02-17T03:24:00"),
    topic:"領導團隊",
    name:"class 1",
  },{
    type:"教學力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"教室文化",
    name:"class 2",
  },{
    type:"領導力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"領導團隊",
    name:"class 3",
  },{
    type:"領導力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"領導他人",
    name:"class 4",
  },{
    type:"領導力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"領導自我",
    name:"class 5",
  },{
    type:"教學力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"教室文化",
    name:"class 6",
  },{
    type:"教學力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2022-12-17T03:24:00"),
    topic:"嚴謹教學",
    name:"class 7",
  },{
    type:"教學力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"教學特色",
    name:"class 8",
  },{
    type:"教學力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2022-12-01T03:24:00"),
    topic:"教學特色",
    name:"class 9",
  },{
    type:"領導力發展",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"領導自我",
    name:"class 10",
  }];
  return course;
}