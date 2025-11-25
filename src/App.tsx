import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavigationBar/Navbar";
import BlurBubbles from "./components/common/BlurBubbles";

function App() {
  return (
    <div>
      <Navbar />
      <BlurBubbles count={10} />
      <main className="max-w-6xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
