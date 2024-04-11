
import "./App.css";
import { Outlet } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box 
    bgGradient='linear(to-l, #CEBACF, #B0A3D4)' 
    minHeight='100vh'
    position='relative'
    >
      <Header />
      <Box bgGradient='linear(to-l, #CEBACF, #B0A3D4)'>
        <Box
        as='main'
        pb='16'
        >
    <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default App;
