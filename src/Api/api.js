const getDay = (day,time)=>{;
  switch (day) {
    case 0: return {day:"Chủ Nhật",time:time};
    case 1: return {day:"Thứ Hai",time:time};
    case 2: return {day:"Thứ Ba",time:time};
    case 3: return {day:"Thứ Tư",time:time};
    case 4: return {day:"Thứ Năm",time:time};
    case 5: return {day:"Thứ Sáu",time:time};
    case 6: return {day:"Thứ Bảy",time:time};
    default:
      return;
  }
}
const newDate = ()=>{
  var date = new Date();
  var day = date.getDay();
  var h = date.getHours();
  var m = (date.getMinutes()<10?0+''+date.getMinutes() : date.getMinutes() )
  var time = h + ':' + m;
  return getDay(day,time)
}
const getCurrentLocation = ()=>{
  return new Promise((result,err)=>{
    navigator.geolocation.getCurrentPosition(
        (position) => {
          let postion =  {latitude: position.coords.latitude,longitude: position.coords.longitude};
          result(postion);
        },
        (error) => err('Bạn chưa bật định vị'),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
  })
}
export default {
  weather:{
    fetchdata : (url)=>fetch(url).then(response=>response.json()),
    getLocation:()=>getCurrentLocation(),
    newDate:()=>newDate(),
    getDay : (day,time)=>getDay(day,time)
  }
}
