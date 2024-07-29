import NavBar from "../navBar/NavBar";

const Home = () => {

  return (

    <div >
      <NavBar />
     
      <div className='bg-yellow-300 text-black font-bold text-2xl'>
        Dashboard
      </div>
      <h1 className='p-64 flex items-center justify-center text-4xl'>Welcome Admin Panel</h1>

    </div>
  )
}

export default Home;
