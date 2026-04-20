import { useState, useEffect } from "react";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.body.classList.add("bg-dark", "text-light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    // (smooth transition)
    <div style={{ transition: "all 0.3s ease" }}>
        <AppNavbar dark={dark} toggleDark={() => setDark(!dark)} />
        <Home dark={dark} />
    </div>
  );
}

export default App;
