import { useState } from "react";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [dark, setDark] = useState(false);

  return(
    <div className={dark ? "bg-dark text-light min-vh-100" : "min-vh-100"}>
        <AppNavbar dark={dark} toggleDark={() => setDark(!dark)} />
        <Home dark={dark} />
    </div>
  )
}

export default App
