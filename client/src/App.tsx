
import { Flex } from "@chakra-ui/react";
import "./App.css";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <Flex>
    <header id='header'>
    <Link to='/login'>Login</Link>
    <Link to='/'>Signup</Link>
    <Link to='/todo'>Todo</Link>
    </header>
    </Flex>

    <main>
      <Outlet />
    </main>
    <footer></footer>
    </>
  )
}

export default App;
