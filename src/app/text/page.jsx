import FileUploader from "@/components/global/FileUploader";
import TextEditor from "@/components/global/TextEditor";
import React from "react";

const page = () => {
  return (
    <div>
      <TextEditor />
      <FileUploader />
    </div>
  );
};

export default page;
