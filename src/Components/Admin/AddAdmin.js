// import React, { useState } from 'react';
// import Home from '../Home';

// const AddAdmin = () => {
//   const [name, setName] = useState('');
//   const [registrationNumber, setRegistrationNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [course, setCourse] = useState('');
//   const [branch, setBranch] = useState('');
//   const [year, setYear] = useState('');
//   const [adminType, setAdminType] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleRegistrationNumberChange = (e) => {
//     setRegistrationNumber(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   }

//   const handleCourseChange = (e) => {
//     setCourse(e.target.value);
//   };

//   const handleBranchChange = (e) => {
//     setBranch(e.target.value);
//   };

//   const handleYearChange = (e) => {
//     setYear(e.target.value);
//   };

//   const handleAdminTypeChange = (e) => {
//     setAdminType(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/addAdmin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, registrationNumber, email, adminType, course, branch, year }),
//       });

//       console.log("Sending request");
//       const data = await response.json();
//       console.log("Getting response");
//       console.log(data);

//       if (data.success) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }

//       // Handle the response data as needed
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (isLoggedIn) {
//     return <Home />;
//   }

//   return (
//     <div>
//       <h2>New Admin</h2>
//       <form onSubmit={handleSubmit}>

//         <div>
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" value={name} onChange={handleNameChange} />
//         </div>

//         <div>
//           <label htmlFor="registrationNumber">Registration Number</label>
//           <input type="text" id="registrationNumber" value={registrationNumber} onChange={handleRegistrationNumberChange} />
//         </div>

//         <div>
//           <label htmlFor='email'>Email</label>
//           <input type="email" id="email" value={email} onChange={handleEmailChange} />
//         </div>

//         <div>
//           <label htmlFor="course">Course</label>
//           <select id="course" value={course} onChange={handleCourseChange}>
//             <option value="">Select Course</option>
//             <option value="B-tech">B-tech</option>
//             <option value="MCA">MCA</option>
//             <option value="M.Sc.">M.Sc.</option>
//             <option value="M-tech">M-tech</option>
//             <option value="Ph.D.">Ph.D.</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="branch">Branch</label>
//           <select id="branch" value={branch} onChange={handleBranchChange}>
//             <option value="">Select Branch</option>
//             <option value="MCA">MCA</option>
//             <option value="CSE">CSE</option>
//             <option value="ECE">ECE</option>
//             <option value="EEE">EEE</option>
//             <option value="Civil">Civil</option>
//             <option value="Mathematics">Mathematics</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="year">Year</label>
//           <select id="year" value={year} onChange={handleYearChange}>
//             <option value="">Select Year</option>
//             <option value="1st">1st</option>
//             <option value="2nd">2nd</option>
//             <option value="3rd">3rd</option>
//             <option value="4th">4th</option>
//           </select>
//         </div>
//         <div>
//           <label>Admin Type</label>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="adminType"
//                 value="Admin1"
//                 checked={adminType === 'Admin1'}
//                 onChange={handleAdminTypeChange}
//               />
//               Admin1
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="adminType"
//                 value="Admin2"
//                 checked={adminType === 'Admin2'}
//                 onChange={handleAdminTypeChange}
//               />
//               Admin2
//             </label>
//           </div>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddAdmin;