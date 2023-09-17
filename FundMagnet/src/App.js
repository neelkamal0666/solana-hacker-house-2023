import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthorizedPageCard from "./components/AuthorizedPageCard";
import Clients from "./pages/Clients";
import LandingPage from "./components/Home/LandingPage";
import CryptoBasket from "./pages/cryptobasket/CryptoBasket";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CryptoBasketDetails from "./pages/cryptobasket/CryptoBasketDetails";
import MyAccount from "./pages/Clients";
import CryptoLensArticleDetails from "./pages/CryptoLensArticleDetails";
import Wallet from "./pages/Wallet";

function App() {
  const appCtx = useSelector((state) => state.app);
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme={"light"}
        // toastStyle={
        //   appCtx.isDarkMode
        //     ? { backgroundColor: "#27272A", color: "#E2E8F0" }
        //     : { backgroundColor: "#F8FAFC", color: "#1F2937" }
        // }
      />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              appCtx.isLoggedIn ? <AuthorizedPageCard /> : <LandingPage />
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="clients" element={<Clients />} />
            <Route
              path="/crypto-basket"
              element={!appCtx.isLoggedIn ? <LandingPage /> : <CryptoBasket />}
            />
            <Route
              path="/crypto-basket-details/:id"
              element={<CryptoBasketDetails />}
            />
            <Route path="/my-account" element={<MyAccount />} />
            <Route
              path="/cryptolens_updates/:id"
              element={<CryptoLensArticleDetails />}
            />
            <Route path="/wallet" element={<Wallet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
