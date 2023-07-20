// import React, { useState } from 'react';
// import Home from '../Home'

// const NewEventForm = () => {
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleNameChange = (e) => {
//         setName(e.target.value);
//     };

//     const handleStartDateChange = (e) => {
//         setStartDate(e.target.value);
//     }

//     const handleEndDateChange = (e) => {
//         setEndDate(e.target.value);
//     }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/addEvent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({name, startDate, endDate}),
//       });

//       console.log(name, startDate, endDate);
//       const data = await response.json();

//       if (data.success) {
//         console.log('Event created successfully!');
//         setIsLoggedIn(true);
//       } 
//       else {
//         console.error('Failed to create event');
//         setIsLoggedIn(false);
//       }
//     } 
//     catch (error) {
//       console.error('Error creating event:', error);
//     }
//   };

//   if (isLoggedIn) {
//     return <Home />;
//   }

//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//         <div>
//             <label>Name:</label>
//             <input type="text" value={name} onChange={handleNameChange}  />
//         </div>
//         <div>
//             <label>Start Date:</label>
//             <input type="date" value={startDate} onChange={handleStartDateChange} />
//         </div>
//         <div>
//             <label>End Date:</label>
//             <input type="date" value={endDate} onChange={handleEndDateChange} />
//         </div>
//         <button type="submit">Create Event</button>
//     </form>
//     </div>
//   );
// };

// export default NewEventForm;



// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import Home from '../Home';

// const NewEventForm = () => {
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/addEvent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, startDate, endDate }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     } catch (error) {
//       console.error('Error creating event:', error);
//     }
//   };

//   if (isLoggedIn) {
//     return <Home />;
//   }

//   return (
//     <Container>
//       <Row className="justify-content-center">
//         <Col xs={12} md={6}>
//           <h2 className="text-center">New Event Form</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formBasicName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={handleNameChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicStartDate">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicEndDate">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//               />
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Create Event
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default NewEventForm;



import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Home from '../Home';

const NewEventForm = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formError, setFormError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !startDate || !endDate) {
      setFormError('Please fill in all fields.');
      return;
    }

    if (/\d/.test(name)) {
      setFormError('Name should not contain digits.');
      return;
    }


    try {
      const response = await fetch('http://localhost:5000/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, startDate, endDate }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (isLoggedIn) {
    return <Home />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">New Event Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicStartDate">
              <Form.Label>Start Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEndDate">
              <Form.Label>End Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
                required
              />
            </Form.Group>

            {formError && <p className="text-danger">{formError}</p>}

            <Button variant="primary" type="submit">
              Create Event
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewEventForm;
