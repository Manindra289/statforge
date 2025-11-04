"use server"
import { supabase } from "./supabase";
import { signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";

export async function getUser(email) {

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if(error)
      return null;

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getUserData(id)
{
   const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('userId', id)
    .single();

  if(error)
      throw new Error(error)
  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function updateUserData(newData)
{
  const userId = newData.userId;

  const obj = {userName : newData.userName}
  const { data, error } = await supabase
    .from("users")
    .update(obj)
    .eq("userId", userId)
    .single();
  
  if(error){
      console.error(error)

  }
  return data;



}

export async function createUser(newUser) {
  const { data, error } = await supabase.from('users').insert([newUser]);
  // console.log("create user : ",data)
  if (error) {
    throw new Error(error)
    // throw new Error('User could not be created');
  }
  
  return data;
}

export async function getHealth(id)
{
  let { data, error } = await supabase.from('users').select('health').eq('userId',id);
  if(error)
      throw new Error("health data error")
  
  return data;
}
export async function changeHealth(id,value)
{
  const arr = await getHealth(id);
  const {strength, intelligence, wisdom, vitality, resistance } = await getUserData(id);
  let health = arr[0].health;
  let newHealth = health + value;
  newHealth = Math.min(100, Math.max(0, newHealth));
  
  // if health reaches 0,  
  if(newHealth === 0)
  {
      newHealth = 100;
      const {data,error} = await supabase.from('users').update(
        {
          health : newHealth,
          "strength" : Math.max(0, strength-3),
          "intelligence" : Math.max(0,intelligence-3),
          "wisdom" : Math.max(0,wisdom-3),
          "vitality" : Math.max(0,vitality-3),
          "resistance" : Math.max(0,resistance-3),
      }) .eq('userId', id).select()

      if(error)
          console.error(error)
      revalidatePath("/dashboard")
      return data;
  }
  else {
  const {data,error} = await supabase.from('users').update({health : newHealth}) .eq('userId', id).select()

  if(error)
      throw new Error("updating data error")
  revalidatePath("/dashboard")
  return data;
  }
}

export async function getGoodHabits(id)
{
        let { data, error } = await supabase.from('goodHabits').select('*').eq("userId",id)
        if (error){
            throw new Error(error)
        }
        return data;

}
export async function getBadHabits(id)
{
        let { data, error } = await supabase.from('badHabits').select('*').eq("userId",id)
        if (error){
            throw new Error(error)
       }
       return data;
}


export async function addGoodHabitsToLogs(id)
{
    const date = new Date().toISOString().split('T')[0];

    const {data, error} = await supabase.from("goodHabitLogs").select(`
        id,
        completed,
        habitId,
        goodHabits ( habitName, category, currentStreak )
        `).eq("date",date).eq("userId",id);
    
    // console.log("data **** ")
    // console.log(data)
    
    if(data.length == 0)
    {
      // Insert new data
      // take data from Goodhabits and insert the data 
      const goodHabits = await getGoodHabits(id);
      
      // also check whether streak is being followed or not ?
      // console.log("goodHabits****")
      
      const today = new Date().toISOString().split("T")[0];
      // we need to change for each habit
      console.log("goodhabits")
      console.log(goodHabits)

      goodHabits.map(
        async (habit)=>{
          // for each habit take the last completed
          const lastCompleted = new Date(habit.lastCompleted);
          const currentDate = new Date(today);
          
          // check the last completed with today
          const diffDays = (currentDate - lastCompleted) / (1000 * 60 * 60 * 24);
          // if it is greater than only we will update the streak, 
          if (diffDays > 1) {
          // Missed one or more days
          
          const habitId = habit.habitId;
          newStreak = 1;
          const {data: updatedData, error:updatedErr} = await supabase.from("goodHabits")
            .update({
              "currentStreak": newStreak,
              "lastCompleted": today,
              "backupLastCompleted": lastCompleted,
            })
            .eq("habitId", habitId)
            .eq("userId", id)
            .select();
          if(updatedErr)
            console.error(updatedErr);
        }

        }



      );
      // console.log(goodHabits)
      
      // we get habitId, habitName, habitCategory, currentStreak, lastCompleted -- everything
      // const lastCompleted = new Date(goodHabits.lastCompleted)
      // const currentDate = new Date(today);
      
      
      // newStreak = goodHabits.currentStreak;

      // const diffDays = (currentDate - lastCompleted) / (1000 * 60 * 60 * 24);

      // not doing task for more than 1 day. 
      // if (diffDays > 1) {
      //   // Missed one or more days
      //   const userId = goodHabits.userId;
      //   const habitId = goodHabits.habitId;
      //   newStreak = 1;
      //   const {data: updatedData, error:updatedErr} = await supabase.from("goodHabits")
      //     .update({
      //       "currentStreak": newStreak,
      //       "lastCompleted": today,
      //       "backupLastCompleted": lastCompleted,
      //     })
      //     .eq("habitId", habitId)
      //     .eq("userId", userId)
      //     .select();
      // }








      const temp = [];



      goodHabits.map((goodHabit)=>{ temp.push({date,userId:goodHabit.userId,habitId: goodHabit.habitId,completed:false}) })
      
      const { data:newData , error:newError } = await supabase.from('goodHabitLogs').insert(temp).select(`id,habitId, goodHabits(habitName, category, currentStreak), completed `).eq("userId",id);
      if(newError)
          throw new Error(newError)

      const sortd = newData.slice().sort((a,b)=> b.habitId - a.habitId );
      // console.log(sortd);

      return sortd;
      // return newData;
    }
    if (error){
        throw new Error(error)
    }
    const sortd = data.slice().sort((a,b)=> b.habitId - a.habitId );
    // console.log(sortd);

    return sortd;
}

export async function deleteGoodHabit(habitId)
{
   let {error } = await supabase.from('goodHabits').delete().eq("habitId",habitId)
    if (error){
        throw new Error(error)
    }
    // revalidatePath("/habits")
    return "success"
}

export async function deleteBadHabit(habitId)
{
  let {error } = await supabase.from('badHabits').delete().eq("habitId",habitId)
    if (error){
        throw new Error(error)
    }
  // revalidatePath("/habits")
  return "success"
  
}



export async function changeCompletion(id,value)
{
    const { data, error } = await supabase.from('goodHabitLogs').update({ completed: value }).eq('id', id) .select()
    // console.log(data);


    const habitId = data[0].habitId;
    const userId = data[0].userId;
    const today = new Date().toISOString().split("T")[0];
    // console.log(today)
    const { data: habit } = await supabase
      .from("goodHabits")
      .select("lastCompleted, currentStreak, backupLastCompleted,category")
      .eq("habitId", habitId)
      .single();

    const category = habit.category;
    
    // get userData
    const { data:userData, error:userError } = await supabase.from('users').select('*').eq('userId', userId).single();
    
    const categoryValue = userData[category];


    let newStreak;
    // console.log(habit);
    if(value === true)
    {
      // take the lastcompleted 
      const lastCompleted = new Date(habit.lastCompleted)
      const currentDate = new Date(today);
      newStreak = habit.currentStreak;

      const diffDays = (currentDate - lastCompleted) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
      } 
      else if (diffDays > 1) {
        // Missed one or more days
        newStreak = 1;
      }
      else
      {
        // first ever completion
        newStreak = 1;
      }


    const {data: updatedData, error:updatedErr} = await supabase
    .from("goodHabits")
    .update({
      "currentStreak": newStreak,
      "lastCompleted": today,
      "backupLastCompleted": lastCompleted,
    })
    .eq("habitId", habitId)
    .eq("userId", userId)
    .select();

    if(updatedErr)
      console.error(updatedErr)
    const { data:updateCategory, error:updateCategoryErr } = await supabase.from('users').update({ [category]: Math.max(0, categoryValue+1) }).eq("userId",userId).select().single();
    if(updateCategoryErr)
      console.error(updateCategoryErr);
    }




    else
    {
      newStreak = habit.currentStreak;
      if(newStreak > 1)
        newStreak -= 1;
      else
          newStreak = 0;

      const lastCompleted = new Date(habit.lastCompleted)
      const {data: updatedData, error:updatedErr} = await supabase
      .from("goodHabits")
      .update({
        "currentStreak": newStreak,
        "lastCompleted": lastCompleted,
        "backupLastCompleted": lastCompleted,
      })
      .eq("habitId", habitId)
      .eq("userId", userId)
      .select();
      if(updatedErr)
        console.error(updatedErr)

    const { data:updateCategory, error:updateCategoryErr } = await supabase.from('users').update({ [category]: Math.max(0, categoryValue-1)}).eq("userId",userId).select().single();
    if(updateCategoryErr)
      console.error("update category error");
    }

  if(error)
      console.error("updateCompletion2 function is throwing error");

}

export async function changeBadHabitCompletion(id,value)
{
  const { data, error } = await supabase.from('badHabitLogs').update({ completed: value }).eq('id', id) .select()
  if(error)
      throw new Error("badhabit function is throwing error");
  // revalidatePath("/dashboard")
  // revalidateTag("goodHabitLogs")
  // console.log("funcation worked")
  // console.log(data);
  return data;
}

// not only to add logs but also use this funtion to get data on dashboard
export async function addBadHabitstoLogs(id)
{
    const date = new Date().toISOString().split('T')[0];
    const {data, error} = await supabase.from("badHabitLogs").select(`id,
        completed,
        habitId,
        badHabits ( habitName )`).eq("date",date).eq("userId",id);
    if(data.length == 0)
    {
      const badHabits = await getBadHabits(id);
      const temp = [];
      badHabits.map((badHabit)=>{ temp.push({date,userId:badHabit.userId,habitId: badHabit.habitId}) })
      const { data:newData , error:newError } = await supabase.from('badHabitLogs').insert(temp).select(`id,
        completed,
        habitId,
        badHabits ( habitName )`);
      if(newError)
          throw new Error(newError)
      
      const sortd = newData.slice().sort((a,b)=> b.habitId - a.habitId );
      // console.log(sortd);

      return sortd;

      // return newData
    }
    if (error){
        throw new Error(error)
    }
    const sortd = data.slice().sort((a,b)=> b.habitId - a.habitId );
    // console.log(sortd);

    return sortd;



    // return data;

}

// add a new habit 

export async function addNewBadHabit(payload)
{
  // add new bad habit
  const { data, error } = await supabase.from('badHabits').insert([payload]).select();
  if(error)
      throw new Error("addNewHabit function is throwing error");
  // console.log("bad Habit added ")
  // console.log(data)
  const temp = [];
  const date = new Date().toISOString().split('T')[0];


  // add new habit to the logs
  temp.push({date,
    userId:data[0].userId,
    habitId: data[0].habitId,
    completed:false
  })

  const { data:newData , error:newError } = await supabase.from('badHabitLogs').insert(temp).select(`id,
        completed,
        habitId,
        badHabits ( habitName )`)


  if(newError)
      throw new Error(newError)
  
  return newData;

}


export async function addNewGoodHabit(payload)
{
  const { data, error } = await supabase.from('goodHabits').insert([payload]).select();
  if(error)
      throw new Error("addNewHabit function is throwing error");

  // console.log("inserted data",data);


  const temp = [];
  const date = new Date().toISOString().split('T')[0];
  temp.push({date,
    userId:data[0].userId,
    habitId: data[0].habitId,
    completed:false
  })
  // I also need to add to logs
  
  const { data:newData , error:newError } = await supabase.from('goodHabitLogs').insert(temp).select(`id,habitId, goodHabits(habitName, category), completed `)
  // console.log("New data")
  // console.log(newData);
  if(newError)
      throw new Error(newError)
  
  return newData;
 
}
// pass trackerId to this function
export async function updateTrackerData(trackerData)
{
	const id = trackerData.trackerId;
	const date = new Date().toISOString().split('T')[0];
	// const {data:oldData, error:oldError} = await supabase.from("trackers").select(`
	// 	trackerId,
    //     sleepStr,
    //     mobileStr,
    //     studyStr`).eq("date",date).eq("trackerId",id);
	
	// console.log("this is old Data");
	// console.log(oldData)
	// now need to update the data
	
	const { data:newData , error:newError } = await supabase.from('trackers').update(trackerData).eq('trackerId', id) .select()
	// revalidatePath("/dashboard")
	if(newError)
		throw new Error(error)
	return newData;

	// *******
	// const { data:newData , error:newError } = await supabase.from('trackers').update(trackerData).eq('userId',userId).
	// console.log("tracker data added")
	// console.log(newData)
    //   if(newError)
    //       console.error(newError)
    //   return newData
	
	


}




export async function addTrackerData(id)
{
    const date = new Date().toISOString().split('T')[0];
    const {data, error} = await supabase.from("trackers").select(`
		*`).eq("date",date).eq("userId",id);
	// console.log(data)
    if(data?.length == 0)
    {
      const temp = [
	{
		sleepStr :"00:00",
        mobileStr :"00:00",
        studyStr : "00:00",
		userId :id,
		date
		}];

      const { data:newData , error:newError } = await supabase.from('trackers').insert(temp).select(`
	*
		`);
	// console.log("tracker data added")
	// console.log(newData)
      if(newError)
          throw new Error(newError)
      return newData
    }
    if (error){
        throw new Error(error)
    }
    return data;
}
// this is tracker id
export async function getTrackerData(id)
{
	let { data: trackers, error } = await supabase.from('trackers').select('*').eq('trackerId',id);

	if(error)
		throw new Error(error)
	
	return trackers;

}


export async function fetchSleepData(userId)
{
   const { data, error } = await supabase.from("trackers").select("date, sleepNum").eq('userId',userId). order("date", { ascending: true });
   if(error)
      throw new Error(error)

   return data;
}
export async function fetchMobileData(userId)
{
   const { data, error } = await supabase.from("trackers").select("date, mobileNum").eq('userId',userId). order("date", { ascending: true });
   if(error)
      throw new Error(error)

   return data;
}
export async function fetchStudyData(userId)
{
   const { data, error } = await supabase.from("trackers").select("date, studyNum").eq('userId',userId). order("date", { ascending: true });
   if(error)
      throw new Error(error)

   return data;
}

export async function AddFriend(userId,friendUserId)
{
  const { data, error } = await supabase
  .from('friends')
  .insert([
    { userId,friendUserId }
  ])
  .select(`userId, friendUserId`)
  revalidatePath("/friends")
   if(error)
      throw new Error(error)
   return data;
}

export async function RemoveFriend(userId,friendUserId)
{
  const { error } = await supabase
  .from('friends')
  .delete()
  .eq('userId',userId)
  .eq('friendUserId',friendUserId)
   revalidatePath("/friends")
  if(error)
      throw new Error(error)
}





export async function getFriends(userId)
{
  const { data, error } = await supabase
  .from('friends')
  .select(`friendUserId, friendUserId(userName,health,avatar,userId)`)
  .eq('userId',userId)
   if(error)
      throw new Error(error)
   return data;
}




export async function signInAction()
{
   await signIn("google",{redirectTo:"/dashboard"});
}

export async function signOutAction()
{
    await signOut({redirectTo:"/"})
}