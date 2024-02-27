
import "./App.css";
import { Outlet } from 'react-router-dom';
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box bgGradient='linear(to-l, #CEBACF, #B0A3D4)' h='100vh'>
      <Header />
    <main>
      <Outlet />
    </main>
      <Footer />
    </Box>
  )
}

export default App;
