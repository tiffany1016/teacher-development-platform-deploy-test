export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:"領導力",
    topic:"主題一",
    name:"class 1",
  },{
    type:"領導力",
    topic:"主題2",
    name:"class 2",
  },{
    type:"領導力",
    topic:"主題3",
    name:"class 3",
  },{
    type:"領導力",
    topic:"主題3",
    name:"class 4",
  }];
  return course;
}