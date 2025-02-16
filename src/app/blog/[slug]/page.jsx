import { Footer, Newsletter } from "@/components/common";
import SingleBlog from "@/components/SingleBlog";
import axios from "axios";

const fetchBlogs = async (id) => {
  try {
    const res = await axios.get(
      `https://travelgo-blog-backend-141065095049.us-central1.run.app/api/v1/blog/${id}`, // Ensure correct endpoint
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data || !res.data.blog) {
      throw new Error("Invalid response structure");
    }

    return res.data.blog;
  } catch (error) {
    console.error("Error fetching blog:", error?.response?.data || error.message);
    return null; // Avoid breaking the UI
  }
};

const Page = async ({ params }) => {
  const { slug } = params; // Fixed: No `await` needed here

  const data = await fetchBlogs(slug);
  if (!data) return <p className="text-center text-red-500">Blog not found</p>;

  return (
    <main className="min-h-screen bg-white">
      {/* Blog Post Content */}
      <SingleBlog data={data} />

      <Newsletter />
      <Footer />
    </main>
  );
};

export default Page;
