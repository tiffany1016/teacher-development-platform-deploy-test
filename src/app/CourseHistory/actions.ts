export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("1443-12-07T03:24:00"),
    topic:"主題A1",
    name:"class 1",
  },{
    type:"教學力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題B1",
    name:"class 2",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題A2",
    name:"class 3",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題A3",
    name:"class 4",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題A3",
    name:"class 5",
  },{
    type:"教學力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題B2",
    name:"class 6",
  },{
    type:"教學力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題B2",
    name:"class 7",
  },{
    type:"CC力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題C1",
    name:"class 8",
  },{
    type:"CC力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題C1",
    name:"class 9",
  },{
    type:"DD力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題D1",
    name:"class 10",
  }];
  return course;
}