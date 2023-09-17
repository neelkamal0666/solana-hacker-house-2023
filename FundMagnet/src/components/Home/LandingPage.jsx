import React from "react";
import Banner from "./Banner/Banner";
import AboutCrypto from "./AboutCrypto/AboutCrypto";
import WhyChoose from "./WhyChoose/WhyChoose";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <AboutCrypto />
      <WhyChoose />
      <Footer />
    </div>
  );
};

export default LandingPage;
