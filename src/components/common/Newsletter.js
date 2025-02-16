import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="bg-[#FDFDE5] py-16 mt-[64px]">
      <div className="container mx-auto px-4 text-center max-w-[88rem]">
        <p className="text-sm font-medium text-yellow-500 mb-2">NEWSLETTER</p>
        <h2 className="text-3xl font-bold mb-4">
          Join our exclusive travel community
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our exclusive travel community to connect with fellow explorers,
          share tips and discover new destinations. Get inspired, exchange
          stories, and enhance your travel experiences with like-minded
          adventurers!
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <Input type="email" placeholder="Email Address" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
