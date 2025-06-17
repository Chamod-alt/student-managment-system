// front end studend list 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    className: '',
    contactNumber: '',
    motherName: '',
    fatherName: '',
    picture: null
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = (student) => {
    setEditingStudent(student);
    setFormData({
      studentId: student.studentId,
      studentName: student.studentName,
      className: student.className,
      contactNumber: student.contactNumber,
      motherName: student.motherName,
      fatherName: student.fatherName,
      picture: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    try {
      await axios.put(
        `http://localhost:5000/api/students/${editingStudent.id}`,
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student List</h2>
      <button
                    className="btn btn-sm btn-primary m-2"
                    onClick={() => navigate('/register')}
                  >
                    Registation Form
                  </button>

                  <br />
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Contact</th>
              <th>Mother</th>
              <th>Father</th>
              <th>Picture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.className}</td>
                <td>{student.contactNumber}</td>
                <td>{student.motherName}</td>
                <td>{student.fatherName}</td>
                <td>
                  {student.picture ? (
                    <img
                    src={`http://localhost:5000/uploads/${student.picture}`}
                      alt="Student"
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover', borderRadius: '5px' }}
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleUpdate(student)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editingStudent && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleFormSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Student</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingStudent(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="studentId"
                        className="form-control"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        placeholder="Student ID"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="studentName"
                        className="form-control"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="Student Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="className"
                        className="form-control"
                        value={formData.className}
                        onChange={handleInputChange}
                        placeholder="Class Name"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="contactNumber"
                        className="form-control"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Contact Number"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        name="motherName"
                        className="form-control"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        placeholder="Mother's Name"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        name="fatherName"
                        className="form-control"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        placeholder="Father's Name"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="file"
                      name="picture"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingStudent(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
