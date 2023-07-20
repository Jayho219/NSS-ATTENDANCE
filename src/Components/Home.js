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
//         <h2>Current Events</h2>
//         {events.map((event) => (
//           <div key={event.eventName}>
//             {event.eventName}
//             <button onClick={() => handleViewMore(event)}>
//               View More
//             </button>
//           </div>
//         ))}
//       </div>

//       <div>
//         <h2>Past Events</h2>
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



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

function Home() {
    const [AttendanceData, setAttendanceData] = useState(null);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [pastEventsEntries, setPastEventEnteries] = useState(null);
    const [activeEventsEntries, setActiveEventsEnteries] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/showEvents');
            const responseData = await response.json();
        
            setAttendanceData(responseData);
            
            const ActivedisplayedEntries = responseData.filter(event => new Date(event.endDate) >= new Date());
            setActiveEventsEnteries(ActivedisplayedEntries);
            
            const PastdislayedEnteries = responseData.filter(event => new Date(event.endDate) < new Date());
            setPastEventEnteries(PastdislayedEnteries);
            
            setFilteredEntries(PastdislayedEnteries);
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (AttendanceData === null) {
        return <div>Loading...</div>;
    }

    const handleEntriesToShowChange = (event) => {
        setEntriesToShow(Number(event.target.value));
        setCurrentPage(1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(filteredEntries.length / entriesToShow);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchQuery === '') {
            setFilteredEntries(pastEventsEntries);
        } else {
            const filteredData = pastEventsEntries.filter((event) =>
                event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEntries(filteredData);
        }
        setCurrentPage(1);
    };



    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value === '') {
            setFilteredEntries(pastEventsEntries);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(e);
    };


    //   const entriesPerPage = entriesToShow;
    const dataLength = filteredEntries.length;
    const totalPages = Math.ceil(dataLength / entriesToShow);
    const indexOfLastEntry = currentPage * entriesToShow;
    const indexOfFirstEntry = indexOfLastEntry - entriesToShow;
    const indexOfActiveEntry = 0;

    const displayedEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const pageLinks = [];
    for (let page = 1; page <= totalPages; page++) {
        pageLinks.push(
            <li
                className={`page-item ${currentPage === page ? 'active' : ''}`}
                aria-current="page"
                key={page}
            >
                <a className="page-link" href="#" onClick={() => setCurrentPage(page)}>
                    {page}
                </a>
            </li>
        );
    }

    const handleReportClickActive = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(activeEventsEntries);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Active Event Report');
        const timestamp = Date.now();
        XLSX.writeFile(workbook, `active_event_report_${timestamp}.xlsx`);
    };

    const handleReportClickPast = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(pastEventsEntries);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Past Event Report');
        const timestamp = Date.now();
        XLSX.writeFile(workbook, `past_event_report_${timestamp}.xlsx`);
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-6">
                    <h2>Upcoming and Running Events</h2>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end">
                    <Button variant="secondary" onClick={handleReportClickActive} style={{ marginRight: '10px' }}>
                        Report
                    </Button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Event Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeEventsEntries.map((event, index) => (                            
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                                <td>{indexOfActiveEntry + index + 1}</td>
                                <td>
                                    <Link to={`/showCurrentEvent/${event._id}`}>
                                        {event.eventName}
                                    </Link>
                                </td>
                                <td>{event.startDate}</td>
                                <td>{event.endDate}</td>
                            </tr>
                            
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="row mt-5">
                <div className="col-sm-6 d-flex align-items-center">
                    <div className="dataTables_length bs-select" id="dtBasicExample_length">
                        <div className="d-flex align-items-center">
                            <h2 className="mr-auto">Past Events</h2>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 d-flex align-items-center justify-content-end">
                    <div className="d-flex flex-wrap justify-content-end align-items-center">
                        <Button variant="secondary" onClick={handleReportClickPast}>
                            Report
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mt-3">
                <div className="col-sm-6 d-flex align-items-center">
                    <div className="dataTables_length bs-select" id="dtBasicExample_length">
                        <div className="d-flex align-items-center">
                            <label className="mb-0 mr-2">Show</label>
                            <select
                                name="dtBasicExample_length"
                                aria-controls="dtBasicExample"
                                className="custom-select custom-select-sm form-control form-control-sm"
                                style={{ width: 'auto' }}
                                value={entriesToShow}
                                onChange={handleEntriesToShowChange}
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                            <label className="mb-0 ml-2">entries</label>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 d-flex align-items-center justify-content-end">
                    <form className="form-inline" onSubmit={handleSearchSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                                style={{ width: '200px' }}
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="submit">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Event Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                      {pastEventsEntries.map((event, index) => (                            
                              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                                  <td>{indexOfFirstEntry + index + 1}</td>
                                  <td>
                                      <Link to={`/showPastEvent/${event._id}`}>
                                          {event.eventName}
                                      </Link>
                                  </td>
                                  <td>{event.startDate}</td>
                                  <td>{event.endDate}</td>
                              </tr>
                          ))}
                    </tbody>
                </table>
            </div>


            <div className="panel-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <div className="mb-2">
                                Showing <b>{displayedEntries.length}</b> out of <b>{pastEventsEntries.length}</b> entries
                            </div>
                            <ul className="pagination">
                                <li className="page-item" onClick={handlePreviousPage}>
                                    <a className="page-link" href="#">
                                        Previous
                                    </a>
                                </li>
                                {pageLinks}
                                <li className="page-item" onClick={handleNextPage}>
                                    <a className="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
