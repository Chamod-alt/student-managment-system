import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const StudentRegisterForm = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    picture: null,
    className: '',
    contactNumber: '',
    motherName: '',
    fatherName: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('studentId', formData.studentId);
    data.append('studentName', formData.studentName);
    data.append('picture', formData.picture);
    data.append('className', formData.className);
    data.append('contactNumber', formData.contactNumber);
    data.append('motherName', formData.motherName);
    data.append('fatherName', formData.fatherName);
  
    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        body: data,
      });
  
      if (!res.ok) throw new Error('Failed to register student');
  
      alert('Student registered successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
    const navigate = useNavigate();
  return (
    <div className="container mt-5">
        <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => navigate('/')}
                  >
                    Registation Form
                  </button>
      <div className="card shadow-md">
        <div className="card-body">
          <h2 className="text-center mb-4">Student Registration Form</h2>

        
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Picture</label>
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleChange}
                className="form-control"
               
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Class</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-4">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;
