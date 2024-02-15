export const getCourse = async(username:string) =>{
  "use server";
  const course= [{
    type:1,
    topic:"主題一",
    name:"class 1",
  },{
    type:1,
    topic:"主題2",
    name:"class 2",
  },{
    type:1,
    topic:"主題3",
    name:"class 3",
  }];
  return course;
}