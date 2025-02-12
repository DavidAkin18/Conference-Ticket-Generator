import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TicketForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatarBase64: "",
    avatarUrl: "",
  });

  const [errors, setErrors] = useState({});

  // Load saved data from localStorage on page load
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required.";
    if (!formData.avatarBase64 && !formData.avatarUrl) 
      newErrors.avatarBase64 = "Profile photo is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/ticket-selection");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarBase64: reader.result, avatarUrl: "" });
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, avatarUrl: url, avatarBase64: "" });
  };

  return (
    <div className="flex flex-col items-center md:justify-center p-4 min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Upload Profile Photo</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="flex flex-col items-center border-2 border-dashed border-blue-500 rounded-lg p-6 bg-gray-700">
            {formData.avatarBase64 || formData.avatarUrl ? (
              <img
                src={formData.avatarBase64 || formData.avatarUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <div className="text-center text-gray-300">
                  <p className="text-lg">Drag & drop or click to upload</p>
                </div>
              </label>
            )}
          </div>
          {errors.avatarBase64 && <p className="text-red-500 text-sm">{errors.avatarBase64}</p>}

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Image URL Input */}
          <input
            type="url"
            placeholder="Enter image URL"
            value={formData.avatarUrl}
            onChange={handleUrlChange}
            className="w-full p-3 rounded bg-gray-700 text-white"
          />

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 font-bold p-3 rounded hover:bg-blue-700">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
