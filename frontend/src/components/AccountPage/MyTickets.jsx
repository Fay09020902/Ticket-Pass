import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCurTicketsThunk } from "../../store/ticket";

const MyTickets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const allCurTickets = useSelector(state => state.tickets);

    // Updated to accept ticketId
    const handleDelete = async (ticketId) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            const response = await fetch(`/api/tickets/${ticketId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Ticket deleted successfully');
                navigate("/");
            } else {
                alert('Failed to delete the ticket');
            }
        }
    };

    useEffect(() => {
        if (user && user.id) {
            dispatch(loadCurTicketsThunk(user.id));
        }
    }, [dispatch, user]);

    if (!allCurTickets) {
        return <div className="loading">Loading tickets...</div>;
    }

    if (Object.keys(allCurTickets).length === 0) {
        return <div className="no-tickets">No tickets available</div>;
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
                    <button onClick={() => handleDelete(ticket.id)} className="delete-ticket-button">
                        Delete Ticket
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyTickets;
