import { Route, Routes } from "react-router-dom";

import Landing from "./views/landing";
import Login from "./views/login";
import Signup from "./views/signup";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}
