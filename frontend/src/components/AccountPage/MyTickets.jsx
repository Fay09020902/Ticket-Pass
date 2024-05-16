import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { loadCurTicketsThunk } from "../../store/ticket";
import { NavLink } from 'react-router-dom';

const MyTickets = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allCurTickets = useSelector(state => state.tickets);

    useEffect(() => {
        if (user && user.id) {
            dispatch(loadCurTicketsThunk(user.id));
        }
    }, [dispatch, user]);

    if (!allCurTickets) {
        return <div className="loading">Loading tickets...</div>;
    }

    if (Object.keys(allCurTickets).length === 0) {
        return <div className="no-sessions">No Session Tickets</div>;
    }

    return (
        <div className="myTickets">
            {Object.values(allCurTickets).map(ticket => (
                <div key={ticket.id} className="ticket">
                    <h3>{ticket.eventName}</h3>
                    <p>Artist: {ticket.eventArtist}</p>
                    <p>Date: {ticket.eventDate}</p>
                    <p>Time: {ticket.eventTime}</p>
                    <p>City: {ticket.eventCity}</p>
                    <p>Address: {ticket.eventAddress}</p>
                    <p>Seat: id{ticket.seatId} row{ticket.row} column:{ticket.number}</p>
                    <NavLink className="button-link" to={`/events/${ticket.eventId}/seats`}>
                                Update Seats
                  </NavLink>
                </div>
            ))}
        </div>
    );
};

export default MyTickets
