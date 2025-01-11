import React, { useState, useEffect } from 'react';

const EmployeeProfile = ({ employee_id }) => {
  const [employee, setEmployee] = useState(null); // To store employee data
  const [error, setError] = useState(null);       // To capture any error

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`https://cvsu-system-backend.vercel.app/api/employees/${employee_id}`);

        if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch employee data");
        }

        const data = await response.json(); // Parse JSON response
        setEmployee(data); // Update employee state
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError(error.message); // Update error state with message
      }
    };

    if (employee_id) {
      fetchEmployeeData();
    }
  }, [employee_id]); // Dependency array includes employee_id

  // Handle errors
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Handle case where no employee data is found
  if (!employee) {
    return <div className="text-center text-gray-600">No employee data found.</div>;
  }

  // Render the profile if data is fetched
  return (
    <div className="p-8 bg-green-500 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/150" // Placeholder image
            alt="Profile"
            className="rounded-full w-24 h-24 border-4 border-green-600"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{employee.full_name}</h1>
            <p className="text-xl text-gray-600">{employee.employee_type}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="font-semibold text-gray-600">Phone:</p>
              <p className="text-gray-500">{employee.phone_number}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Address:</p>
              <p className="text-gray-500">{employee.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Date of Birth:</p>
              <p className="text-gray-500">{new Date(employee.dob).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700">Emergency Contact</h2>
          <div className="mt-4">
            <p className="font-semibold text-gray-600">Phone:</p>
            <p className="text-gray-500">{employee.emergency_contact}</p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            onClick={() => alert('Edit Profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
