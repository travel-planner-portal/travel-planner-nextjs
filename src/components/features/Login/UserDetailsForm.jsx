import React, { useState } from "react";
import { ArrowRight, Phone, Shield } from "lucide-react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => <Loader2 className="w-5 h-5 animate-spin" />;

const UserDetailsForm = ({
  onSubmit,
  loading,
  initialData = {},
  signupMethod = "phone",
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    phoneNumber: initialData.phoneNumber || "",
    email: initialData.email || "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const age = parseInt(formData.age);

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (
      signupMethod === "google" &&
      (!formData.phoneNumber || formData.phoneNumber.length !== 10)
    ) {
      newErrors.phoneNumber = "Valid phone number is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || age < 1 || age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "phoneNumber") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {signupMethod === "google" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength={10}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
              placeholder="Enter your phone number"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-1 flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Enter 10 digit mobile number
          </p>
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>
      )}

      {signupMethod === "phone" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
            placeholder="Enter your email (optional)"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age<span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          max="120"
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
          placeholder="Enter your age"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-500">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender<span className="text-red-500">*</span>
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-yellow-300 focus:ring focus:ring-yellow-100 transition-all outline-none"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-yellow-300 rounded-xl text-[15px] text-gray-900 font-medium hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <span className="flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              Complete Registration
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default UserDetailsForm;
