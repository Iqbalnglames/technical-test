import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import DetailData from "../Pages/Detail";

const PathName = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailData />} />
        </Routes>
    )
}
export default PathName