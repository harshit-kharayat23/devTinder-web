import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { FE_DOMAIN_URL } from "../../utils/constants";
import Card from "./Card";
const Feed=()=>{

    const dispatch=useDispatch();
    const feedData=useSelector(store=>store.feed);
    const getFeed=async()=>{
        try{
        if(feedData)return;
        const feed=await axios.get(FE_DOMAIN_URL+'/user/feed',{withCredentials:true})
        dispatch(addFeed(feed.data));
        }
        catch(err){
            console.log(err)
        }

    }


    useEffect(()=>{
        getFeed();
    },[])

    if(!feedData)return;
    if(feedData.length==0){
        return <p className="text-center font-bold text-3xl my-10">No Users Available</p>
    }
    return (
        <div className="flex justify-center my-15">
           {feedData && <Card user={feedData[0]} /> }
        </div>
    )
}

export default Feed;