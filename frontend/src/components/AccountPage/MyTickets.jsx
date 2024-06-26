import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurTicketsThunk } from "../../store/ticket";
import { NavLink } from 'react-router-dom';
import { setCurrentSeat } from "../../store/seats";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteTicketModal from "../DeleteTicketModal/DeleteTicketModal";

const MyTickets = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allCurTickets = useSelector(state => state.tickets);

    // const handleDelete = async (ticketId) => {
    //     if (window.confirm('Are you sure you want to delete this ticket?')) {
    //         const response = await dispatch(deleteTicketThunk( ticketId))
    //         if (response.message) {
    //             alert('Ticket deleted successfully');
    //         } else {
    //             alert('Failed to delete the ticket');
    //         }
    //     }
    // };

    useEffect(() => {
        if (user && user.id) {
            dispatch(loadCurTicketsThunk(user.id));
        }
    }, [dispatch, user]);

    if (!allCurTickets) {
        return <div className="loading">Loading tickets...</div>;
    }

    if (Object.keys(allCurTickets).length === 0) {
        return <div className="no-tickets">No Tickets Available</div>;
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
                    <p className="seat-details">Seat: ID {ticket.seatId} ROW {ticket.row} COLUMN {ticket.number}</p>
                    {/* <button onClick={() => handleDelete(ticket.id)} className="delete-ticket-button">
                        Delete Ticket
                    </button> */}
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteTicketModal ticketId={ticket.id} />}
                    />
                    <NavLink className="update-seat-button"
                        to={`/events/${ticket.eventId}/tickets/${ticket.id}/seat`}
                        onClick={() => dispatch(setCurrentSeat(ticket.seatId))}
                    >
                       Update Seat
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default MyTickets;
