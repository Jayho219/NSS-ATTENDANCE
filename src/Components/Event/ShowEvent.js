// // import React, { useEffect, useState } from 'react';
// // import { useLocation } from 'react-router-dom';

// // const ShowEvent = () => {

// //   const location = useLocation();
// //   const event = location.state?.event;
// //   const [userData, setUserData] = useState([]);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch('http://localhost:5000/showUsers');
// //       const data = await response.json();
// //       setUserData(data);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //   };


// //   const handleAttendance = async (userId, userEmail) => {
// //     try {
// //       const response = await fetch('http://localhost:5000/takeAttendance', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           eventName: event.eventName,
// //           userEmail: userEmail,
// //         }),
// //       });

// //       const data = await response.json();
// //       if (data.success) {
// //         // Update the attendance status
// //         setUserData((prevData) =>
// //           prevData.map((user) =>
// //             user._id === userId ? { ...user, attendance: 'Present' } : user
// //           )
// //         );
// //       }
// //     } catch (error) {
// //       console.error('Error taking attendance:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Event Details</h1>
// //       {event && (
// //         <div>
// //           <h3>Event Name: {event.eventName}</h3>
// //           <p>Start Date: {event.startDate}</p>
// //           <p>Start Time: {event.startTime}</p>
// //           <p>End Date: {event.endDate}</p>
// //           <p>End Time: {event.endTime}</p>
// //         </div>
// //       )}
// //       <h1>User Data</h1>
// //       {userData.map((user) => (
// //         <div key={user._id}>
// //           <div>
// //             <p>Name: {user.name}</p>
// //             <p>Email: {user.email}</p>
// //             <p>Course: {user.course}</p>
// //             <p>Branch: {user.branch}</p>
// //             <p>Year: {user.year}</p>
// //           </div>
// //           <div>
// //           <button onClick={() => handleAttendance(user._id, user.email)}>
// //   {user.events.includes(event.eventName) ? 'Present' : 'Absent'}
// // </button>

// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ShowEvent;






// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';

// // const ShowEvent = () => {
//   // const { id } = useParams();
//   // const [event, setEvent] = useState(null);
//   // const [userData, setUserData] = useState([]);

//   // useEffect(() => {
//   //   fetchEvent();
//   //   fetchData();
//   // }, []);

//   // const fetchEvent = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:5000/showEvents');
//   //     const data = await response.json();
//   //     console.log(data);
//   //     const event = data.find((event) => event._id === id);
//   //     setEvent(event);
//   //     console.log(event, "h");
//   //   } catch (error) {
//   //     console.error('Error fetching event data:', error);
//   //   }
//   // };

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:5000/showUsers');
//   //     const data = await response.json();
//   //     setUserData(data);
//   //   } catch (error) {
//   //     console.error('Error fetching user data:', error);
//   //   }
//   // };

//   // const handleAttendance = async (userId, userEmail) => {
//   //   try {
//   //     const response = await fetch('http://localhost:5000/takeAttendance', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         eventName: event.eventName,
//   //         userEmail: userEmail,
//   //       }),
//   //     });

//   //     const data = await response.json();
//   //     if (data.success) {
//   //       // Update the attendance status
//   //       setUserData((prevData) =>
//   //         prevData.map((user) =>
//   //           user._id === userId ? { ...user, attendance: 'Present' } : user
//   //         )
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Error taking attendance:', error);
//   //   }
//   // };

// //   return (
// //     <div>
//   // {
//   //   event && (
//   //     <div>
//   //       <h3>Event Name: {event.eventName}</h3>
//   //       <p>Start Date: {event.startDate}</p>
//   //       <p>End Date: {event.endDate}</p>
//   //     </div>
//   //   )
//   // }

// //       <h1>User Data</h1>
// //       {userData.map((user) => (
// //         <div key={user._id}>
// //           <div>
// //             <p>Name: {user.name}</p>
// //             <p>Email: {user.email}</p>
// //             <p>Course: {user.course}</p>
// //             <p>Branch: {user.branch}</p>
// //             <p>Year: {user.year}</p>
// //           </div>
//           // <div>
//           //   <button
//           //     onClick={() => handleAttendance(user._id, user.email)}
//           //     disabled={user.events.includes(event?.eventName)}
//           //   >
//           //     {user.events.includes(event?.eventName) ? 'Present' : 'Absent'}
//           //   </button>
//           // </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ShowEvent;






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Button, Modal } from 'react-bootstrap';
// import { PencilFill, TrashFill } from 'react-bootstrap-icons';


// const ShowEvent = () => {

//     const { id } = useParams();
//     const [event, setEvent] = useState(null);
//     const [userData, setUserData] = useState([]);
//     const [showModal, setShowModal] = React.useState(false);

//     const [entriesToShow, setEntriesToShow] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);

//     const [search, setSearch] = useState('');
//     const setSearchQuery = (e)=>{
//         setSearch(e.target.value);
//     }

  
//     useEffect(() => {
//       fetchEvent();
//       fetchData();
//     }, []);
  
//     const fetchEvent = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/showEvents');
//         const data = await response.json();
//         console.log(data);
//         const event = data.find((event) => event._id === id);
//         setEvent(event);
//         console.log(event, "h");
//       } catch (error) {
//         console.error('Error fetching event data:', error);
//       }
//     };
  
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/showUsers');
//         const data = await response.json();
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     const handleAttendance = async (userId, userEmail) => {
//       try {
//         const response = await fetch('http://localhost:5000/takeAttendance', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             eventName: event.eventName,
//             userEmail: userEmail,
//           }),
//         });
  
//         const data = await response.json();
//         if (data.success) {
//           // Update the attendance status
//           setUserData((prevData) =>
//             prevData.map((user) =>
//               user._id === userId ? { ...user, attendance: 'Present' } : user
//             )
//           );
//         }
//         fetchEvent();
//         fetchData();
//       } catch (error) {
//         console.error('Error taking attendance:', error);
//       }
//     };

//     const handleDeleteAttendance = async(userId, userEmail) => {
//       try{
//         const response = await fetch('http://localhost:5000/deleteAttendance', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({            
//             eventName: event.eventName,
//             userEmail: userEmail,
//           }),
//         });

//         const data = await response.json();
//         if(data.success) {
//           alert('Deleted successfully');
//         }
//         fetchEvent();
//         fetchData();
//       }
//       catch(error) {
//         console.log('Error in deleting attendance');
//       }
//     };
      
//     if (userData === null) {
//         return <div>Loading...</div>;
//     }

//     const handleEntriesToShowChange = (event) => {
//         setEntriesToShow(Number(event.target.value));
//         setCurrentPage(1);
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             day: '2-digit',
//             month: '2-digit',
//             year: 'numeric'
//         }).replace(/\//g, '-');
//     };

    
//     const entriesPerPage = entriesToShow;
//     const dataLength = userData ? userData.length : 0;
//     const totalPages = Math.ceil(dataLength / entriesToShow);
//     const indexOfLastEntry = currentPage * entriesToShow;
//     const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
//     const displayedEntries = userData.slice(indexOfFirstEntry, indexOfLastEntry);

//     const pageLinks = [];
//     for (let page = 1; page <= totalPages; page++) {
//         pageLinks.push(
//             <li
//                 className={`page-item ${currentPage === page ? "active" : ""}`}
//                 aria-current="page"
//                 key={page}
//             >
//                 <a className="page-link" href="#" onClick={() => setCurrentPage(page)}>
//                     {page}
//                 </a>
//             </li>
//         );
//     }


//     const handleModalToggle = () => {
//         setShowModal(!showModal);
//     };

    



//     return (
// <>
//       {
//           event && (
//             <Container>
//             <Row className="justify-content-center">
//               <Col xs={12} md={6}>
//                 <div>
//                   <h3 className="text-center">{event.eventName}</h3>
//                   <p className="text-center">
//                     <strong>Start Date:</strong> {formatDate(event.startDate)}
//                   </p>
//                   <p className="text-center">
//                     <strong>End Date:</strong> {formatDate(event.endDate)}
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//           )
//         }
//         <div className="d-flex align-items-start justify-content-center" style={{ minHeight: "100vh" }}>
//             <div className="container">

//                 <div className="row mb-4">
//                     <div className="col-sm-6 d-flex align-items-center">
//                         <div className="dataTables_length bs-select" id="dtBasicExample_length">
//                             <div className="d-flex align-items-center">
//                                 <h2 className="mr-auto text-center">Attendance List</h2>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-sm-6 d-flex align-items-center justify-content-end">
//                         <div className="d-flex flex-wrap justify-content-end align-items-center">


//                             <Button variant="primary">Generate Report</Button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row mb-4">
//                     <div className="col-sm-6">
//                         <div className="dataTables_length bs-select" id="dtBasicExample_length">
//                             <div className="d-flex align-items-center">
//                                 <h4 className="mr-auto">Add Filter</h4>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-sm-6 d-flex align-items-center justify-content-end">
//                         <div className="d-flex flex-wrap">

//                             <div className="form-group mr-2 mb-2">
//                                 <select className="form-control">
//                                     <option value="">Branch</option>
//                                     {/* Add branch options here */}
//                                 </select>
//                             </div>

//                             <div className="form-group mr-2 mb-2">
//                                 <select className="form-control">
//                                     <option value="">Batch</option>
//                                     {/* Add batch options here */}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="row mb-4">
//                     <div className="col-sm-6 d-flex align-items-center">
//                         <div className="dataTables_length bs-select" id="dtBasicExample_length">

//                             <div className="d-flex align-items-center">
//                                 <label className="mb-0 mr-2">Show</label>
//                                 <select
//                                     name="dtBasicExample_length"
//                                     aria-controls="dtBasicExample"
//                                     className="custom-select custom-select-sm form-control form-control-sm"
//                                     style={{ width: "auto" }}
//                                     value={entriesToShow}
//                                     onChange={handleEntriesToShowChange}
//                                 >
//                                     <option value="3">3</option>
//                                     <option value="5">5</option>
//                                     <option value="10">10</option>
//                                     <option value="15">15</option>
//                                 </select>
//                                 <label className="mb-0 ml-2">entries</label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-sm-6 d-flex align-items-center justify-content-end">
//                         <form className="form-inline" onSubmit={setSearchQuery}>
//                             <div className="input-group">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Search..."
//                                     onChange={setSearchQuery}
//                                     aria-label="Search"
//                                     style={{ width: "200px" }}
//                                 />
//                                 <div className="input-group-append">
//                                     <button className="btn btn-primary" type="submit">
//                                         Search
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//                 <div className="table-responsive">
//                     <table className="table table-striped" id="userTable">
//                         <thead>
//                             <tr>
//                                 <th>Sno</th>
//                                 <th>Student Name</th>
//                                 <th>Registration No</th>
//                                 <th>Branch</th>
//                                 <th>Participation</th>
//                                 <th>Batch(Year)</th>
//                                 <th>Attendance Status</th>
//                                 <th>Delete</th>
//                             </tr>
//                         </thead>
//                         <tbody id="tbody">
                            
//                             {displayedEntries.map((student, index) => (
//                                 <tr key={index}>
//                                     <td>{indexOfFirstEntry + index + 1}</td>
//                                     <td>{student.name}</td>
//                                     <td>{student.registrationNumber}</td>
//                                     <td>{student.course}</td>
//                                     <td>
//                                         <span className={`badge ${student.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
//                                             {student.status}
//                                         </span>
//                                     </td>
//                                     <td>{student.year}</td>
//                                     <td>
//                                       <button
//                                         onClick={() => handleAttendance(student._id, student.email)}
//                                         disabled={student.events.includes(event?.eventName)}
//                                       >
//                                         {student.events.includes(event?.eventName) ? 'Present' : 'Absent'}
//                                       </button>
//                                     </td>
//                                     <td>
//                                         {/* <TrashFill  size={24} style={{ color: 'red' }} /> */}
//                                         <button onClick={() => handleDeleteAttendance(student._id, student.email)}
//                                         disabled={!student.events.includes(event?.eventName)}
//                                         >
//                                           Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>



//                     <div className="panel-footer">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-12 d-flex justify-content-between align-items-center">
//                                     <div className="mb-2">
//                                         Showing <b>{displayedEntries.length}</b> out of <b>{userData.length}</b> entries
//                                     </div>
//                                     <ul className="pagination">
//                                         <li className="page-item" onClick={handlePreviousPage}>
//                                             <a className="page-link" href="#">
//                                                 Previous
//                                             </a>
//                                         </li>
//                                         {pageLinks}
//                                         <li className="page-item" onClick={handleNextPage}>
//                                             <a className="page-link" href="#">
//                                                 Next
//                                             </a>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>



//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default ShowEvent;


