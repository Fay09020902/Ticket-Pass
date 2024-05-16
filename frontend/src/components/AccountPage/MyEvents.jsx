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
        try{
            const response =await dispatch(deleteEventThunk(eventId))
            if (response) {
                alert('Event deleted successfully');
            }
        } catch (res) {
            const data = await res.json();
            if (data.message.includes("Cannot delete event with tickets sold")) {
                setError("Cannot delete event with tickets sold.");
            } else {
                setError("Failed to delete event.");
            }
        }
    }


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
            {error && <div className="error-message">{error}</div>}
            <div className="event-grid">
                {Object.values(allCurEvents).map(event => (
                    <div key={event.id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>{event.artist}</p>
                        <p>{event.type}</p>
                        <p>{event.date} at {event.time}</p>
                        <p>{event.city}, {event.country}</p>
                        <button onClick={() => handleDelete(event.id)}>Delete Event</button>
                        <NavLink className="button-link" to={`/events/${event.id}/edit`}>
                                Update
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
