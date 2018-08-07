import types from '../Types/types';
const initState = {
  isLoading : true,
  data:{},
  error:''
}
const Reducers = (state=initState,action={})=>{
  switch (action.type) {
    case types.Fetch_Data_Weather : return {...state,isLoading:false,data:action.data};
    case types.Get_Data_Error : return {...state,isLoading:false,error:action.error};
    default:
      return state;
  }
}
export default Reducers;
