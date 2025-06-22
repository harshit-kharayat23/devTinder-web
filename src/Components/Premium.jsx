import axios from "axios";
import React ,{useEffect, useState}from "react";
import { FE_DOMAIN_URL } from "../../utils/constants";



const Premium = () => {

  const [premium,setPremium]=useState(false);
  useEffect(()=>{
      verifyPremiumUser();
  },[])
  const verifyPremiumUser=async()=>{

    const response=await axios.get(FE_DOMAIN_URL +"/premium/verify",{
      withCredentials:true
    })
    console.log(response);

    if(response.data.isPremium){
        setPremium(true);
    }




  }
  const handleBuyCLick=async(plan)=>{

        const order=await axios.post(FE_DOMAIN_URL +"/payment/create",{
          memeberShipType:plan,
        },{withCredentials:true})

        // open RazorPay Dialog box
        console.log(order);
        const {amount,currency,keyId,orderId,notes}=order.data
        const options = {
        key:keyId, 
        amount,
        currency,
        name: 'Dev Tinder',
        description: 'Connect to other developers',
        order_id: orderId,
        prefill:{
          name:notes.firstName+ " " +notes.lastName,
          email:notes.emailId,
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremiumUser,
      };
        const rzp = new window.Razorpay(options);
        rzp.open();


  }

  
  return premium? <div className="font-bold text-center text-5xl my-20">Already a Premium User </div> : (
    <div className="m-20">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
        <h1 className="font bold text-3xl">Silver Membership</h1>
        <ul>
            <li>- Extra 20 Likes</li>
            <li>- Chat with other People</li>
            <li>- Blue Tick</li>
        
        </ul>
        <button className="btn btn-primary" onClick={()=>handleBuyCLick("silver")} >Buy Silver</button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font bold text-3xl">Gold Membership</h1>
           <ul>
            <li>- Unlimited Likes</li>
            <li>- Chat with other People</li>
            <li>- Blue Tick</li>ks
        
        </ul>
        <button className="btn  btn-secondary" onClick={()=>handleBuyCLick("gold")}>Buy Gold</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
