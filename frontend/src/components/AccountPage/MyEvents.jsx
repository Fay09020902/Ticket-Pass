import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadSessionEventsThunk } from "../../store/event";
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteEventModal from "../DeleteEventModal/DeleteEventModal";

const MyEvents = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const allCurEvents = useSelector(state => state.events.events);
    const [loading, setLoading] = useState(true);

    // const handleDelete = async (eventId) => {
    //     if (window.confirm('Are you sure you want to delete this event?')) {
    //         try {
    //             const response = await dispatch(deleteEventThunk(eventId));
    //             if (response.message === 'Successfully deleted') {
    //                 alert('Event deleted successfully');
    //             } else {
    //                 setError(response);
    //             }
    //         } catch (err) {
    //             const data = await err.json();
    //             alert(`{${data.message}}`)
    //         }
    //     }
    // };

    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            dispatch(loadSessionEventsThunk(user.id)).then(() => {
                setLoading(false);
            });
        }
    }, [dispatch, user]);

    if (loading) {
        return <div className="loading">Loading events...</div>;
    }

    if (!allCurEvents || Object.keys(allCurEvents).length === 0) {
        return <div className="no-events">No Session Events</div>;
    }


    return (
        <div className="myEvents">
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
                        <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteEventModal eventId={event.id} />}
                        />
                        <NavLink className="update-seat-button" to={`/events/${event.id}/edit`}>Update</NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
