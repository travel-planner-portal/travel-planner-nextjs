const SingleBlogSkeleton = () => {
    return (
        <article className="max-w-4xl mx-auto px-4 animate-pulse">
            {/* Header Skeleton */}
            <div className="text-center pt-16 pb-8 space-y-6">
                {/* Category */}
                <div className="w-24 h-4 bg-gray-200 rounded mx-auto" />

                {/* Title */}
                <div className="space-y-3 max-w-2xl mx-auto">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto" />
                </div>

                {/* Subtitle */}
                <div className="space-y-2 max-w-2xl mx-auto">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
            </div>

            {/* Main Image Skeleton */}
            <div className="mb-12">
                <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg" />
            </div>

            {/* Content Sections Skeleton */}
            {[1, 2, 3].map((_, index) => (
                <div key={index} className="mb-12 space-y-4">
                    {/* Section Title */}
                    <div className="h-6 bg-gray-200 rounded w-1/3" />

                    {/* Section Content */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>

                    {/* Section Image */}
                    <div className="w-full h-[200px] md:h-[300px] bg-gray-200 rounded-lg mt-6" />
                </div>
            ))}
        </article>
    );
};

export default SingleBlogSkeleton; 