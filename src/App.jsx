import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import JoinFilesToOne from "./pages/JoinFilesToOne";
import FilterColumns from "./pages/FilterColumns";
import DivideAFile from "./pages/DivideAFile";
import SubFiles from "./pages/SubFiles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/join_file_to_one" element={<JoinFilesToOne/>}/>
        <Route path="/filter_columns" element={<FilterColumns/>}/>
        <Route path="/divide_a_file" element={<DivideAFile/>}/>
        <Route path="/make_sub_files" element={<SubFiles/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
