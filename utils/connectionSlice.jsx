import { createSlice } from "@reduxjs/toolkit";


const connectionSlice=createSlice({
    name:"connections",
    initialState:[],

    reducers:{
        setUserConnections:(state,action)=>{
            return action.payload;
        }
    }
})
export const {setUserConnections}=connectionSlice.actions;
export default connectionSlice.reducer;