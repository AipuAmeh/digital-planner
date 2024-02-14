
import { Flex } from "@chakra-ui/react";
import "./App.css";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Flex>
    <header id='header'>
      <Header />
    <Link to='/login'>Login</Link>
    <Link to='/signup'>Signup</Link>
    <Link to='/todo'>Todo</Link>
    </header>
    </Flex>

    <main>
      <Outlet />
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default App;
