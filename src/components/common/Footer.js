import { MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 max-w-[88rem]">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6" />
            <span className="font-bold text-xl">FindTrip</span>
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
