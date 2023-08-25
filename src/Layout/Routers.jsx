import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";

const PathName = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}
export default PathName