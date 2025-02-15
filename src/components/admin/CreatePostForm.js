"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import FileUploader from "../global/FileUploader";
import TextEditor from "../global/TextEditor";

export default function CreatePostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState([
    { title: "", content: "", image: { url: "", alt: "" } },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    featuredImage: {
      url: "",
      alt: "",
    },
    category: "LOCATION",
    author: {
      name: "",
      avatar: "",
    },
    readTime: "",
    location: {
      name: "",
      country: "",
    },
    featured: false,
  });

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev };
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        newData[parent] = { ...newData[parent], [child]: value };
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      newSections[index][parent] = {
        ...newSections[index][parent],
        [child]: value,
      };
    } else {
      newSections[index][field] = value;
    }
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", content: "", image: { url: "", alt: "" } },
    ]);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/blog/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sections,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created:", data);
      // Handle success (e.g., redirect or show success message)
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Main Details */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <TextEditor
              value={formData.subtitle}
              onChange={(content) => {
                setFormData((prev) => ({ ...prev, subtitle: content }));
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Image URL</label>
              <FileUploader onFileSelect={(file)=>{console.log(file)}} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Featured Image Alt</label>
              <Input
                name="featuredImage.alt"
                value={formData.featuredImage.alt}
                onChange={handleInputChange}
                placeholder="Enter image alt text"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOCATION">Location</SelectItem>
                  <SelectItem value="FEATURED">Featured</SelectItem>
                  <SelectItem value="INSIGHT">Insight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Author Name</label>
              <Input
                name="author.name"
                value={formData.author.name}
                onChange={handleInputChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Read Time</label>
              <Input
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="e.g., 5min read"
                required
              />
            </div>
          </div>

          {formData.category === "LOCATION" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Location Name</label>
                <Input
                  name="location.name"
                  value={formData.location.name}
                  onChange={handleInputChange}
                  placeholder="Enter location name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Sections */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Content Sections</h3>
          <Button
            type="button"
            onClick={addSection}
            variant="outline"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>

        {sections.map((section, index) => (
          <Card key={index}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Section {index + 1}</h4>
                {sections.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Section Title</label>
                <Input
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                  placeholder="Enter section title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Section Content</label>
                <TextEditor />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Section Image URL
                  </label>
                  <FileUploader
                    onFileSelect={(e) =>
                      handleSectionChange(index, "image.url", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Section Image Alt
                  </label>
                  <Input
                    value={section.image.alt}
                    onChange={(e) =>
                      handleSectionChange(index, "image.alt", e.target.value)
                    }
                    placeholder="Enter image alt text"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
