import { useState, ChangeEvent, FormEvent } from 'react';

export default function AddNewStudent() {
  const [formData, setFormData] = useState({
    studentId: '',
    department: '',
    building: '',
    room: '',
    status: 'Active',
    fullName: '',
    gender: 'Male',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className='flex min-h-screen flex-col rounded-lg border border-blue-300'>
      {/* Header */}
      <header className='border-b border-blue-300 p-4 text-center text-xl font-medium text-blue-600'>
        Header
      </header>

      <div className='flex flex-grow'>
        {/* Sidebar */}
        <div className='w-64 border-r border-blue-300 p-4 font-medium text-blue-600'>
          Sidebar
        </div>

        {/* Main Content */}
        <div className='flex flex-grow flex-col'>
          <div className='flex-grow p-4'>
            <h1 className='mb-4 text-xl font-medium text-blue-600'>
              Add New Student
            </h1>

            {/* Registration Form */}
            <div className='rounded-lg border border-blue-300 p-6'>
              <h2 className='mb-2 text-lg font-medium text-blue-600'>
                New Student Registration
              </h2>
              <p className='mb-4 text-sm text-blue-500'>
                Add a new student to the dormitory management system. Required
                fields are marked with an asterisk (*).
              </p>

              <form onSubmit={handleSubmit}>
                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {/* Student ID */}
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Student ID
                    </label>
                    <input
                      type='text'
                      name='studentId'
                      placeholder='E.g. 2300001'
                      className='w-full rounded border border-gray-300 p-2'
                      value={formData.studentId}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Department
                    </label>
                    <select
                      name='department'
                      className='w-full rounded border border-gray-300 bg-white p-2'
                      value={formData.department}
                      onChange={handleChange}
                    >
                      <option value=''>Select student's department</option>
                      <option value='CS'>Computer Science</option>
                      <option value='CHE'>Chemical Engineering</option>
                      <option value='ME'>Materials Engineering</option>
                      <option value='CE'>Civil Engineering</option>
                      <option value='EE'>Electrical Engineering</option>
                      <option value='ME'>Mechanical Engineering</option>
                      <option value='CAE'>
                        Control and Automation Engineering
                      </option>
                      <option value='IT'>Information Technology</option>
                      <option value='EE'>Environmental Engineering</option>
                      <option value='IM'>Industrial Management</option>
                      <option value='LSCM'>
                        Logistics and Supply Chain Management
                      </option>
                      <option value='BIO'>Biotechnology</option>
                      <option value='SE'>Software Engineering</option>
                    </select>
                  </div>
                </div>

                {/* Building Selection */}
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    Building
                  </label>
                  <select
                    name='building'
                    className='w-full rounded border border-gray-300 bg-white p-2'
                    value={formData.building}
                    onChange={handleChange}
                  >
                    <option value=''>Select a building</option>
                    <option value='BK001'>BK001</option>
                    <option value='BK002'>BK002</option>
                    <option value='BK003'>BK003</option>
                    <option value='BK004'>BK004</option>
                  </select>
                </div>

                <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                  {/* Room Assignment */}
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Room Assignment
                    </label>
                    <select
                      name='room'
                      className='w-full rounded border border-gray-300 bg-white p-2'
                      value={formData.room}
                      onChange={handleChange}
                    >
                      <option value=''>Select a room</option>
                      <option value='101'>101</option>
                      <option value='102'>102</option>
                      <option value='103'>103</option>
                      <option value='104'>104</option>
                      <option value='201'>201</option>
                      <option value='202'>202</option>
                      <option value='203'>203</option>
                      <option value='204'>204</option>
                      <option value='301'>301</option>
                      <option value='302'>302</option>
                      <option value='303'>303</option>
                      <option value='304'>304</option>
                      <option value='401'>401</option>
                      <option value='402'>402</option>
                      <option value='403'>403</option>
                      <option value='404'>404</option>
                    </select>
                    <p className='mt-1 text-xs text-gray-500'>
                      Current occupancy / maximum capacity
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Status
                    </label>
                    <select
                      name='status'
                      className='w-full rounded border border-gray-300 bg-white p-2'
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                      <option value='Pending'>Pending</option>
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div className='mb-6'>
                  <h3 className='mb-1 font-medium'>Personal Information</h3>
                  <p className='mb-4 text-xs text-gray-500'>
                    Enter the personal details of the student
                  </p>

                  <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {/* Full Name */}
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        placeholder='E.g. Nguyen Van A'
                        className='w-full rounded border border-gray-300 p-2'
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Gender
                      </label>
                      <select
                        name='gender'
                        className='w-full rounded border border-gray-300 bg-white p-2'
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {/* Date of Birth */}
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Date of Birth
                      </label>
                      <input
                        type='date'
                        name='dateOfBirth'
                        className='w-full rounded border border-gray-300 p-2'
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className='mb-1 block text-sm font-medium'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        name='phoneNumber'
                        placeholder='E.g. 0123456789'
                        className='w-full rounded border border-gray-300 p-2'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className='mb-4'>
                    <label className='mb-1 block text-sm font-medium'>
                      School Email
                    </label>
                    <input
                      type='email'
                      name='email'
                      placeholder='E.g. student@hcmut.edu.vn'
                      className='w-full rounded border border-gray-300 p-2'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className='mb-1 block text-sm font-medium'>
                      Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      placeholder='Enter full address'
                      className='w-full rounded border border-gray-300 p-2'
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Form buttons */}
                <div className='mt-6 flex justify-end space-x-2'>
                  <button
                    type='button'
                    className='rounded border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                  >
                    Add student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className='border-t border-blue-300 p-4 text-center text-blue-600'>
        Footer
      </footer>
    </div>
  );
}
