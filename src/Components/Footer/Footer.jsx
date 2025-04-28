import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig"; // Adjust the path as necessary
import { collection, addDoc } from "firebase/firestore";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "contacts"), formData);
      console.log("Document written with ID: ", docRef.id);
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form

      // Automatically hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <footer className="py-4 bg-dark text-white">
      <div className="container">
        <div className="row">
          {/* Contact Form on the Left */}
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <form className="my-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
            {successMessage && (
              <p className="text-success mt-3">{successMessage}</p>
            )}
          </div>

          {/* Contact Details on the Right */}
          <div className="col-md-6 text-md-start text-center contact-info">
            <h4>Contact Information</h4>
            <p>
              <strong>Phone:</strong> +1-234-567-890
            </p>
            <p>
              <strong>Email:</strong> contact@muhammedalibrahim.com
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 text-center">
          <h5>Developed by Muhammed Alibrahim</h5>
          <p>&copy; {new Date().getFullYear()} Muhammed Alibrahim. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}