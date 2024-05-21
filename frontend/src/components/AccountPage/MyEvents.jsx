import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadSessionEventsThunk, deleteEventThunk } from "../../store/event";
import { NavLink } from 'react-router-dom';

const MyEvents = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const allCurEvents = useSelector(state => state.events.events);
    const [error, setError] = useState("");

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await dispatch(deleteEventThunk(eventId));
                console.log(response)
                if (response.message === 'Successfully deleted') {
                    alert('Event deleted successfully');
                } else {
                    setError(response);
                }
            } catch (err) {
                const data = await err.json();
                alert(`{${data.message}}`)
            }
        }
    };


    useEffect(() => {
        if (user && user.id) {
            dispatch(loadSessionEventsThunk(user.id));
        }
    }, [dispatch, user]);

    if (!allCurEvents) {
        return <div className="loading">Loading events...</div>;
    }

    if (Object.keys(allCurEvents).length === 0) {
        return <div className="no-events">No Session Events</div>;
    }


    return (
        <div className="myEvents">
            {error && <div className="error-message">{error.message}</div>}
            <div className="event-grid">
                {Object.values(allCurEvents).map(event => (
                    <div key={event.id} className="event-card">
                        <NavLink to={`/events/${event.id}`} className="image-detail-link">
                            <img src={event.img_url} alt={event.name} />
                            <h3>{event.name}</h3>
                            <p>{event.artist}</p>
                            <p>{event.type}</p>
                            <p>{event.date} at {event.time}</p>
                            <p>{event.city}, {event.country}</p>
                        </NavLink>
                        <button onClick={() => handleDelete(event.id)} className="delete-ticket-button">Delete Event</button>
                        <NavLink className="update-seat-button" to={`/events/${event.id}/edit`}>Update</NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
