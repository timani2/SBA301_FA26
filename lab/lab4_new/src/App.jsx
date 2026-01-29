import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import ListOfOrchids from "./components/ListOfOrchids.jsx";
import EditOrchid from "./components/EditOrchid.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  );
}

export default App;
