import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./page/Login";
import Menu from "./page/Menu";
//import EstablishmentsSelect from "./page/BranchesSelect";
//import "./App.css";
import { ProtectedRoute } from "./page/ProtectedRoute";
import { RedirectAuth } from "./page/RedirectAuth";
//import { RedirectAuth } from "./page/RedirectAuth ";
// import { RedirectEstablishments } from "./page/RedirectEstablishments ";

function App() {
  return (
    <>
      <Routes>
         <Route element={<RedirectAuth />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/*<Route element={<RedirectEstablishments />}>
          <Route path="/establecimiento/*" element={<EstablishmentsSelect />} />
        </Route> */}

        <Route element={<ProtectedRoute />}>
          <Route path="/menu/*" element={<Menu />} />
        </Route>
        {/* Redirección automática de "/" a "/menu" */}
        {/* <Route path="/" element={<Navigate to="/menu" replace />} /> */}
      </Routes>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
