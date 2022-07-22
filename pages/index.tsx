import { Container } from "@mui/material";
import type { NextPage } from "next";
import Header from "../components/home/header/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className='home-container'>
        <div className='home-side-menu'>
          <p>shadamon</p>
        </div>
        <div className='home-main-part'>
          <p>home</p>
        </div>
        <div className='home-ads'>
          <p>ads</p>
        </div>
      </main>
    </>
  );
};

export default Home;
