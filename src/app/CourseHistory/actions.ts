export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:"領導力",
    topic:"主題A1",
    name:"class 1",
  },{
    type:"教學力",
    topic:"主題B1",
    name:"class 2",
  },{
    type:"領導力",
    topic:"主題A2",
    name:"class 3",
  },{
    type:"領導力",
    topic:"主題A3",
    name:"class 4",
  },{
    type:"領導力",
    topic:"主題A3",
    name:"class 5",
  },{
    type:"教學力",
    topic:"主題B2",
    name:"class 6",
  },{
    type:"教學力",
    topic:"主題B2",
    name:"class 7",
  },{
    type:"CC力",
    topic:"主題C1",
    name:"class 8",
  },{
    type:"CC力",
    topic:"主題C1",
    name:"class 9",
  },{
    type:"DD力",
    topic:"主題D1",
    name:"class 10",
  }];
  return course;
}