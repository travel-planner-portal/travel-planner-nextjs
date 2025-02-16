"use client"
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const FileUploader = ({
    value,
    onFileSelect,
    accept = "image/*",
    maxSize = 5, // max size in MB
    required = false
}) => {
    const [selectedFileName, setSelectedFileName] = useState("");
    const [error, setError] = useState("");
    const uniqueId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;

    const validateFile = (file) => {
        // Reset error
        setError("");

        // Check if file exists when required
        if (!file && required) {
            setError("Please select a file");
            return false;
        }

        if (!file) return true; // Skip other validations if file is optional and not provided

        // Check file size (convert maxSize to bytes)
        const maxSizeInBytes = maxSize * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            setError(`File size must be less than ${maxSize}MB`);
            return false;
        }

        // Check file type
        if (accept && !file.type.match(accept.replace(/\*/g, '.*'))) {
            setError(`Please select a valid file type (${accept})`);
            return false;
        }

        return true;
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setError(""); // Reset error on new selection

        if (file) {
            if (validateFile(file)) {
                setSelectedFileName(file.name);
                if (onFileSelect) {
                    onFileSelect(file);
                }
            } else {
                event.target.value = ''; // Reset input
                setSelectedFileName("");
                if (onFileSelect) {
                    onFileSelect(null);
                }
            }
        }
    };

    return (
        <div className="w-full space-y-2">
            <div
                className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg bg-gray-100
                    ${error ? 'border-red-500' : 'border-gray-300'}
                    ${!error && selectedFileName ? 'border-green-500' : ''}
                `}
            >
                <label
                    htmlFor={uniqueId}
                    className="flex flex-col items-center justify-center cursor-pointer w-full"
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-sm text-gray-500">
                            {selectedFileName
                                ? `Selected File: ${selectedFileName}`
                                : "Click to upload file"}
                        </p>
                        <span className="text-xs text-gray-400">
                            {!selectedFileName && (
                                <>
                                    Supported formats: {accept.replace('/*', ' files')}
                                    <br />
                                    Maximum size: {maxSize}MB
                                </>
                            )}
                        </span>
                    </div>
                    <input
                        id={uniqueId}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleFileChange}
                        required={required}
                    />
                </label>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
