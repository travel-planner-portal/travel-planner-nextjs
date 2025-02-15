// app/discover/dates/page.js
"use client";

import DateSelectionPage from "@/components/DateSelectionPage";
import { useSelector } from "react-redux";

export default function Dates() {
  const userData = useSelector((state) => state.userData);

  return <DateSelectionPage inputData={userData} />;
}
