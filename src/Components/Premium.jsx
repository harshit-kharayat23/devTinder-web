import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Separator } from "@/Components/ui/separator";
import { FE_DOMAIN_URL } from "../../utils/constants";

const Premium = () => {
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const response = await axios.get(`${FE_DOMAIN_URL}/premium/verify`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.isPremium) {
        setPremium(true);
      }
    } catch (err) {
      console.error("Error verifying premium status", err);
    }
  };

  const handleBuyClick = async (plan) => {
    try {
      const order = await axios.post(
        `${FE_DOMAIN_URL}/payment/create`,
        {
          memeberShipType: plan,
        },
        { withCredentials: true }
      );

      const { amount, currency, keyId, orderId, notes } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error", err);
    }
  };

  if (premium) {
    return (
      <div className="text-center text-3xl md:text-5xl font-bold my-24 text-green-600">
        🎉 You are already a Premium Member!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
  <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
    Choose Your Membership Plan
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Silver Plan */}
    <Card className="relative flex flex-col justify-between p-6 shadow-lg border border-gray-200 transition hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-gray-700">
          Silver Membership
        </CardTitle>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="text-gray-600 space-y-3 text-sm">
        <ul className="list-disc list-inside space-y-1">
          <li>Extra 20 Likes</li>
          <li>Chat with other People</li>
          <li>Blue Tick</li>
        </ul>
      </CardContent>
      <Button
        className="mt-6 w-full bg-black text-white hover:bg-gray-800"
        onClick={() => handleBuyClick("silver")}
      >
        Buy Silver
      </Button>
    </Card>

    {/* Gold Plan */}
    <Card className="relative flex flex-col justify-between p-6 shadow-lg border-2 border-yellow-400 transition hover:scale-[1.02] hover:shadow-xl duration-300 ease-in-out">
      {/* Optional: Gold badge */}
      <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-md">
        Most Popular
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-yellow-600">
          Gold Membership
        </CardTitle>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="text-gray-600 space-y-3 text-sm">
        <ul className="list-disc list-inside space-y-1">
          <li>Unlimited Likes</li>
          <li>Chat with other People</li>
          <li>Blue Tick</li>
        </ul>
      </CardContent>
      <Button
        variant="secondary"
        className="mt-6 w-full bg-yellow-400 text-white hover:bg-yellow-500"
        onClick={() => handleBuyClick("gold")}
      >
        Buy Gold
      </Button>
    </Card>
  </div>
</div>

  );
};

export default Premium;
