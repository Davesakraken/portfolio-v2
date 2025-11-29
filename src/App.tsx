import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavigationBar/Navbar";
import BlurBubbles from "./components/common/BlurBubbles";
import Layout from "@/components/Layout/Layout";

function App() {
  return (
    <div>
      <Navbar />
      <BlurBubbles count={10} />
      <Layout>
        <main className="max-w-6xl mx-auto px-4 w-full">
          <Outlet />
        </main>
      </Layout>
    </div>
  );
}

export default App;
