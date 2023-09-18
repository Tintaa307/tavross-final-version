"use client";

import Loader from "@/components/shared/Loader";
import { useSession } from "next-auth/react";
import React from "react";
import { statusAuth } from "@/objects/status";
import Landing from "@/components/landing/Landing";
import About from "@/components/about/About";
import Footer from "@/components/footer/Footer";

const Dashboard = () => {
  const { status } = useSession();
  const { LOADING } = statusAuth;

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <>
          <Landing />
          <About />
          <Footer />
        </>
      )}
    </>
  );
};

export default Dashboard;
