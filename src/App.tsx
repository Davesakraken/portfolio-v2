import { Outlet } from "react-router-dom"; // Add this import
import Navbar from "./components/NavigationBar/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container mx-auto mt-6 px-4">
        <Outlet /> {/* This is required for child routes to render */}
      </main>
    </div>
  );
}

export default App;
