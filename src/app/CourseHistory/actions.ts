export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2023-12-17T03:24:00"),
    topic:"主題一",
    name:"class 1",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2002-10-17T03:24:00"),
    topic:"主題2",
    name:"class 2",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("2000-12-13T03:24:00"),
    topic:"主題3",
    name:"class 3",
  },{
    type:"領導力",
    series:"2023峰會",
    teacher:"1",
    time:new Date("1443-12-07T03:24:00"),
    topic:"主題3",
    name:"class 4",
  }];
  return course;
}