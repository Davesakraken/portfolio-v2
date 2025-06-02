import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavigationBar/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="max-w-6xl mx-auto mt-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
