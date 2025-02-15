// app/page.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import Hero from "@/components/sections/Hero";
import ClientHydration from "./ClientHydration";

export default function Home() {
  return (
    <ClientHydration>
      <HomeContent />
    </ClientHydration>
  );
}

function HomeContent() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  return (
    <div className="background-image-homepage">
      <Hero inputData={userData} />
    </div>
  );
}
