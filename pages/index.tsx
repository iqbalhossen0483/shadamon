import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
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
