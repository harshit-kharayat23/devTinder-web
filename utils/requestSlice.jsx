import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"requests",
    initialState:[],

    reducers:{
        getRequests:(state,action)=>{
            return action.payload;
        },
        removeRequest:(state,action)=>{
            const newArray=state.filter(req=>req._id!==action.payload)
            return newArray;
        }
    }
 
})
export const {getRequests,removeRequest}=requestSlice.actions;
export default requestSlice.reducer;