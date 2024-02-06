import React, { useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Search from "./Search";

const NavBar = () => {
  const cart = useSelector((state) => state.cart.productsNumber);
  const [location, setLocation] = useState("");

  const handlePinCodeChange = async (event) => {
    const enteredPinCode = event.target.value;
    if (enteredPinCode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${enteredPinCode}`
        );

        // Check if the API response is successful and has data
        if (
          response &&
          response.data &&
          response.data.length &&
          response.data[0].Status === "Success"
        ) {
          const city = response.data[0].PostOffice[0].District; // Use District for city
          setLocation(city);
        } else {
          setLocation("Location not found");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation("Error fetching location");
      }
    }
  };

  const responseGoogle = (response) => {
    // Handle the Google Sign-In response
    console.log(response);
    // You can perform additional actions based on the response, e.g., user authentication
  };

  return (
    <header className="min-w-[100px]">
      <div className="flex bg-amazonclone text-white h-[60px]">
        <div className="flex items-center m-4">
          <Link to={"/"}>
            <img
              className="h-[35px] w-[100px] m-1"
              src={"../images/amazon.png"}
              alt="Amazon logo"
            />
          </Link>
          <div className="pl-4">
            <div className="text-xs xl:text-sm">
              Deliver to {location ? <span className="font-bold">: {location}</span> : ""}
            </div>
            <input
              type="text"
              placeholder="Enter Pin Code"
              className="text-xs xl:text-sm font-bold border-none bg-transparent text-white focus:outline-none w-15"
              onChange={handlePinCodeChange}
            />
          </div>
        </div>
        <div className="flex-grow relative items-center">
          <Search />
        </div>
        <div className="flex items-center m-4 relative">
          <div className="pr-2 pl-2 flex items-center">
            <img
              className="h-4 w-6"
              src={"../images/indianflag.jpg"}
              alt="Indian Flag"
            />
            <select
              className=" p-2 text-white bg-transparent border-none text-xs xl:text-sm font-bold appearance-none"
              style={{
                width: "57px",
                paddingLeft: "5px",
              }}
            >
            <option value="EN" className="p-2 bg-gray-300 text-black">EN </option>
            <option value="HI" className="p-2 bg-gray-300 text-black">HI (हि)</option>
            <option value="TE" className="p-2 bg-gray-300 text-black">TE (తె)</option>
            <option value="TA" className="p-2 bg-gray-300 text-black">TA (த)</option>
            <option value="KN" className="p-2 bg-gray-300 text-black">KN (ಕ)</option>
            <option value="ML" className="p-2 bg-gray-300 text-black">ML (മ)</option>
            <option value="GU" className="p-2 bg-gray-300 text-black">GU (ગુ)</option>
            <option value="MR" className="p-2 bg-gray-300 text-black">MR (म़)</option>
            <option value="OD" className="p-2 bg-gray-300 text-black">OD (ଓ)</option>
            <option value="BN" className="p-2 bg-gray-300 text-black">BN (বে)</option>
              

              {/* Add more languages as needed */}
            </select>
          </div>
          <div className="absolute right-2 top-2 pointer-events-none flex items-center">
            <svg
              className="h-3.5 w-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center m-4">
          <div className="w-25 pr-4 pl-0">
            <div className="text-xs xl:text-sm">
              <GoogleLogin
                clientId="559700035175-duc4fajbpo8lom9hajohb8fbrrtskh8v.apps.googleusercontent.com"
                buttonText="Hello, sign in "
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
          <div className="pr-2 pl-4">
            <div className="text-xs xl:text-sm">Returns</div>
            <div className="text-sm xl:text-base font-bold">& Orders</div>
          </div>
          <Link to={"/checkout"}>
            <div className="flex pr-3 pl-4">
              <ShoppingCartIcon className="h-[50px]" />
              <div className="relative">
                <div className="absolute right-[9px] font-bold m-2 text-orange-400">
                  {cart}
                </div>
              </div>
              <div className="mt-7 text-xs xl:text-sm font-bold">Cart</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex bg-amazonclone-light_blue text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
        <div>Today's Deals</div>
        <div>Customer Service</div>
        <div>Registry</div>
        <div>Gift Cards</div>
        <div>Sell</div>
      </div>
    </header>
  );
};

export default NavBar;
