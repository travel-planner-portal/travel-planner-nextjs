import CreatePostForm from "../../../components/admin/CreatePostForm";

export default function CreatePost() {
  return (
    <div className="min-h-screen container max-w-[88rem] mx-auto bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <p className="text-gray-600">
            Fill in the details below to create a new blog post
          </p>
        </div>
        <CreatePostForm />
      </div>
    </div>
  );
}
