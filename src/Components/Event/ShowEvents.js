// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function ShowEvents() {
//   const navigate = useNavigate();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/showEvents')
//       const data = await response.json();
//       setEvents(data);
//     } 
//     catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleViewMore = (event) => {
//     console.log(event);
//     // Preserve the event details and navigate to the 'currentEvent' component
//     navigate(`/showEvent`, { state: { event } });
//   };
  
//   return (
//     <div>
//       <div>
//         <h2>All Events</h2>
//         {events.map((event) => (
//           <div key={event.eventName}>
//             {event.eventName}
//             <button onClick={() => handleViewMore(event)}>
//               View More
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default ShowEvents;

