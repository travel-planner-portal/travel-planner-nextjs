"use client"
import React, { useState } from "react";

const FileUploader = ({ value, onFileSelect, accept = "" }) => {
    const uniqueId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (onFileSelect) {
            onFileSelect(file || null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full  p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-100">
            <label
                htmlFor={uniqueId}
                className="flex flex-col items-center justify-center cursor-pointer"
            >
              
                <p className="text-sm text-gray-500 ">
                    {value?.name
                        ? `Selected File: ${value.name}`
                        : "We support selected file formats"}
                </p>
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
