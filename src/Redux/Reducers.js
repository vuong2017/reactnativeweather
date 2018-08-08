import types from '../Types/types';
const initState = {
  isLoading : false,
  data:{},
  error:''
}
const Reducers = (state=initState,action={})=>{
  switch (action.type) {
    case types.Start_App : return{...state,isLoading:true};
    case types.Fetch_Data_Weather : return {error:'',isLoading:false,data:action.data};
    case types.Get_Data_Error : return {...state,isLoading:false,error:action.error};
    default:
      return state;
  }
}
export default Reducers;
