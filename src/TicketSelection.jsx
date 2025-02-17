import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TicketSelection.css"; // Import the CSS file

const TicketSelection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatarBase64: null,
    avatarUrl: null,
    specialRequest: "",
  });

  const [errors, setErrors] = useState({});

  // Load saved data from localStorage on page load
  useEffect(() => {
    const savedTicketData = localStorage.getItem("ticketData");
    if (savedTicketData) {
      const ticketData = JSON.parse(savedTicketData);
      setFormData((prevState) => ({
        ...prevState,
        ...ticketData,
      }));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name should only contain letters and spaces.";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Validate Profile Photo
    if (!formData.avatarBase64 && !formData.avatarUrl) {
      newErrors.avatarBase64 = "Profile photo is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("formData", JSON.stringify(formData));
      navigate("/ticket-display");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatarBase64: reader.result, avatarUrl: null });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="form-main-container">
        <div className="header">
          <h2>Attendee Details</h2>
          <p className="step-indicator">Step 2/3</p>
        </div>
        <hr className="step-percent "/>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* File Upload */}
            <div className="upload-main">
              <p className="Upload-Profile">Upload Profile Photo</p>
              <div className="avatar-upload">
                <div className="avatar-upload-area">
                  {formData.avatarBase64 || formData.avatarUrl ? (
                    <img
                      src={formData.avatarBase64 || formData.avatarUrl}
                      alt="Preview"
                      className="avatar-preview"
                    />
                  ) : (
                    <label className="upload-label">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden-input" />
                      <div className="upload-text">
                        <span>
                          <img src="your-placeholder-image.png" alt="Upload Placeholder" />
                        </span>
                        <p><i className="ri-upload-cloud-line"><br /></i>Drag & drop or click to upload</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              {errors.avatarBase64 && <p className="error-message">{errors.avatarBase64}</p>}
            </div>
            <hr className="hr" />
            
            {/* Name Input */}
            <label className="input-label">Enter your name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              onBlur={validateForm}
              className={`input-field ${errors.fullName ? "input-error" : ""}`}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}

            {/* Email Input */}
            <label className="input-label">Enter your Email *</label>
            <div className="input-container">
              <img 
                src="https://res.cloudinary.com/def9quyti/image/upload/v1739789685/envelope_dadpyj.png" 
                alt="email-logo" 
                className="input-icon" 
              />
              <input
                type="email"
                placeholder="hello@avioflagos.io"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={validateForm}
                className={`input-email input-field ${errors.email ? "input-error" : ""}`}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}

            {/* Special Request */}
            <label className="input-label">Special Request</label>
            <textarea
              placeholder="Write your request here..."
              value={formData.specialRequest}
              onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
              className="input-field"
              rows={4}
            />

            {/* Submit Button */}
            <div className="button-group">
              <button className="cancel-button" onClick={() => navigate("/")}>Back</button>
              <button type="submit" className="next-button ">Get My Free Ticket</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
