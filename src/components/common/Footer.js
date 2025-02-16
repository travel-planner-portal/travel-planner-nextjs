import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.svg";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 max-w-[88rem]">
        <div className="flex justify-between items-center">
          <Link
            href={"/"}
            className="flex flex-row items-center justify-start gap-2"
          >
            <Image
              src={logo}
              alt="FindTrip"
              className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] object-contain"
            />
          </Link>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
