import types from '../Types/types';
import api from '../Api/api';
export const actionCreators = {
  StartApp : ()=>({
    type:types.Start_App
  }),
  GetDataWeather : (data)=>({
    type:types.Fetch_Data_Weather,
    data
  }),
  GetError: error=>({
    type:types.Get_Data_Error,
    error
  })
}
export const FetchDataWeather = ()=>dispatch=>{
  dispatch(actionCreators.StartApp())
  return api.weather.isLocation().then((enable)=>{
     if(enable){
       return api.weather.getLocation()
       .then((data)=>{
         let url = `https://api.openweathermap.org/data/2.5/forecast/daily?&units=metric&lat=${data.latitude}&lon=${data.longitude}&cnt=7&appid=c0c4a4b4047b97ebc5948ac9c48c0559`;
         return api.weather.fetchdata(url)
         .then((data)=>{
           let datacurrent = {name:data.city.name,time:api.weather.newDate(),description:data.list[0].weather[0].description,icon:data.list[0].weather[0].icon,temp:data.list[0].temp.day,rain:data.list[0].rain,humidity:data.list[0].humidity,speed:data.list[0].speed};
           let dataall = {...data,time:api.weather.newDate(),datacurrent};
           console.log(dataall);
           dispatch(actionCreators.GetDataWeather(dataall));
         })
         .catch(err=>dispatch(actionCreators.GetError("URL không dúng")))
       }
       )
       .catch(err=>dispatch(actionCreators.GetError(err)))
     }
     else{
       dispatch(actionCreators.GetError("Bạn chưa bật định vị"));
     }

  })

}
