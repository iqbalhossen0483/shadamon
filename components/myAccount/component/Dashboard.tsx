import Image from "next/image";
import React, { useState } from "react";
import useStore from "../../../context/hooks/useStore";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SettingsIcon from "@mui/icons-material/Settings";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { Button } from "@mui/material";
import UserPhotoUpload from "./UserPhotoUpload";

const Dashboard = () => {
  const [showUserPhotoUpload, setShowUserPhotoUpload] = useState(false);
  const store = useStore();

  async function singOut() {
    if (store) {
      const { error } = await store.auth.singOut();
      if (error) {
        store.State.setAlert({ msg: "An error occured", type: "error" });
      } else {
        store.State.setShowMyAccountPage(false);
      }
    }
  }

  return (
    <div className='dasboard-container'>
      <section className='user-info'>
        <div className='user-photo'>
          <Image
            className='rounded-full'
            height={100}
            width={100}
            src={store?.auth.user?.photoURL || "/no-picture-logo.jpg"}
            alt='profile'
          />
          <div
            onClick={() => setShowUserPhotoUpload(true)}
            className='add-icon'
          >
            <AddIcon />
          </div>
        </div>
        <div className='user-name'>
          <div className='leading-5'>
            <p className='name'>{store?.auth.user?.displayName}</p>
            <p className='number'>
              {store?.auth.user?.phoneNumber || "02255525575"}
            </p>
          </div>
          <div>
            <p>Account Type</p>
            <div>
              <span className='text-gray-900'>Free</span>
              <span>Seller</span>
              <span>Upgrade</span>
            </div>
          </div>
        </div>
        <div className='text-gray-500'>
          <p>NID/Passport is not varified</p>
          <p>Mobile is not varified</p>
        </div>
      </section>
      <section className='post-earn'>
        <h3>Post & Earn</h3>
        <main>
          <div className='text-left leading-5 mb-3'>
            <p className='font-semibold'>Your Earning: TK {200}</p>
            <p className='text-gray-500'>Valid: till 26.12.22</p>
          </div>
          <div className='border-y flex justify-between bg-gray-100 py-2'>
            <div className='text-gray-500'>
              <p>Get $1500. Post 30 Ad in 1 month.</p>
              <p>Get $2500. Post 30 Ad in 1 year.</p>
            </div>
            <div className='flex items-center pr-2'>
              <Button>Post Ad</Button>
            </div>
          </div>
          <div className='flex justify-between text-sm mb-5'>
            <p>Bonus Income Discount Code: xxxxx (valid: till 12.12.22)</p>
            <p>*See More</p>
          </div>
          <div className='leading-5 pb-3'>
            <p>How to get &quot;Bonus Income&quot;</p>
            <p className='text-gray-500'>
              At certain times, revenue from certain number of ad posts will be
              backed up as a dicount before purchasing a new package.
              <p>Also read Terms & Condition & Privacy in our website</p>
            </p>
          </div>
        </main>
      </section>
      <section className='user-activity'>
        <h3>Account Activity</h3>
        <main>
          <div>
            <h3>{0}</h3>
            <p>Total AD Post</p>
          </div>
          <div>
            <h3>{0}</h3>
            <p>This Month Add Post</p>
          </div>
          <div>
            <h3>{0}</h3>
            <p>Bonus Earn This Month</p>
          </div>
          <div>
            <h3>
              <ExitToAppIcon />
            </h3>
            <p>Product List</p>
          </div>
          <div>
            <h3>{0}</h3>
            <p>Used Access Out of: 50</p>
          </div>
          <div>
            <h3>{0}</h3>
            <p>Total Shop Follower</p>
          </div>
        </main>
      </section>
      <section className='following'>
        <h3>Your Following Seller</h3>
      </section>
      <div className='user-setting'>
        <h3>Settings</h3>
        <main>
          <Button>
            <NotificationsActiveIcon /> Notifications
          </Button>
          <Button>
            <SettingsIcon /> Account Settings
          </Button>
          <Button>
            <ProductionQuantityLimitsIcon /> My Orders
          </Button>
          <Button>
            <BeenhereIcon /> Favorite Products
          </Button>
          <Button onClick={singOut}>Log Out</Button>
        </main>
      </div>
      <div className='ads'>
        <Image width={500} height={60} src='/ads.jpg' alt='Ad' />
      </div>

      <UserPhotoUpload
        showUserPhotoUpload={showUserPhotoUpload}
        setShowUserPhotoUpload={setShowUserPhotoUpload}
      />
    </div>
  );
};

export default Dashboard;
