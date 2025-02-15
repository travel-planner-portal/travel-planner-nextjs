"use client";

import TripsPage from "@/components/TripsPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Trips() {
  const router = useRouter();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    if (
      !userData.budget ||
      !userData.duration ||
      !userData.tripType ||
      !userData.interest
    ) {
      toast.error("Please complete all required steps first");
      router.push("/");
      return;
    }
  }, [userData, router]);

  return <TripsPage inputData={userData} />;
}
