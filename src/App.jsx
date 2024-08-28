import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import JoinFilesToOne from "./pages/JoinFilesToOne";
import FilterColumns from "./pages/FilterColumns";
import DivideAFile from "./pages/DivideAFile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/join_file_to_one" element={<JoinFilesToOne/>}/>
        <Route path="/filter_columns" element={<FilterColumns/>}/>
        <Route path="/divide_a_file" element={<DivideAFile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
