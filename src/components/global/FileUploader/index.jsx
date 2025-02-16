"use client"
import React, { useState } from "react";

const FileUploader = ({ value, onFileSelect, accept = "" }) => {
    const [selectedFileName, setSelectedFileName] = useState("");
    const uniqueId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
            if (onFileSelect) {
                onFileSelect(file);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
            <label
                htmlFor={uniqueId}
                className="flex flex-col items-center justify-center cursor-pointer"
            >
                <p className="text-sm text-gray-500">
                    {selectedFileName
                        ? `Selected File: ${selectedFileName}`
                        : "Click to upload file"}
                </p>
                <span className="text-xs text-gray-400 mt-1">
                    {!selectedFileName && "We support selected file formats"}
                </span>
                <input
                    id={uniqueId}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};

export default FileUploader;
