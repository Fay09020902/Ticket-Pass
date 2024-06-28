import { useDispatch, useSelector } from "react-redux";
import "./PurchaseTicket.css";
import { updateSeatAvailability, deselectSeat, clearSelectedSeats } from "../../store/seats";
import { addTicketsThunk, updateTicketThunk } from '../../store/ticket';
import { useNavigate, useParams } from 'react-router-dom';
import { clearCurrentSeat } from "../../store/seats";

export default function PurchaseTicket() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const originalSeatId = useSelector(state => state.seats.currentSeat);
    const amount = useSelector(state => state.seats.subTotal);
    const selectionChanged = useSelector(state => state.seats.selectionChanged);
    const curEvent = useSelector(state => state.events.currEvent);
    const selectedSeats = useSelector(state => state.seats.selectedSeats);
    const curUser = useSelector(state => state.session.user);

    const handlePlaceOrder = async () => {
        try {
            let seatsUpdated;
            if (selectionChanged && ticketId) {
                // Update the original ticket with new seats
                await dispatch(updateTicketThunk({ seatId: selectedSeats[0] }, ticketId));
                // Make old seat available in database
                await dispatch(updateSeatAvailability([originalSeatId], true));
                // Make the new seat unavaiabel(sold) in seat table in the database
                seatsUpdated = await dispatch(updateSeatAvailability(selectedSeats, false));
                // Clear the current seat
                dispatch(clearCurrentSeat());
            } else {
                // Make new seats sold in the database
                seatsUpdated = await dispatch(updateSeatAvailability(selectedSeats, false));

                // Add the ticket in the ticket table with the sold seatId
                if (seatsUpdated) {
                    await dispatch(addTicketsThunk(
                        {
                            eventId: curEvent.id,
                            userId: curUser.id,
                            seats: selectedSeats
                        }
                    ));
                }
            }

            // Clear all selected seats from redux selectedSeats state
            dispatch(clearSelectedSeats());

            // Update isSelected to false in redux state of seats
            selectedSeats.forEach(seatId => {
                dispatch(deselectSeat(seatId, curEvent.price));
            });
            alert("Purchase succeeded");
            navigate(`/accounts`);
        } catch (e) {
            if (e.message) {
                alert(`${e.message}`);
            } else {
                alert("Please login to purchase");
            }
        }
    };

    return (
        <div className="TicketCart">
            <div className="TicketCart__detail_container">
                <div className="TicketCart__details">
                    <h2>Event Summary</h2>
                    <h3>{curEvent.name}</h3>
                    <p>Address: {curEvent.address}, {curEvent.city}, {curEvent.country}</p>
                    <p>Date: {curEvent.date}</p>
                    <p>Time: {curEvent.time}</p>
                    <h4 className="hosted-by">Hosted by: {curEvent.User?.firstName} {curEvent.User?.lastName}</h4>
                    <div className="seats-summary">
                        <p>{selectedSeats.length} Tickets Selected:</p>
                        <ul className="selected-seats-list">
                            {selectedSeats.map(seat => (
                                <li key={seat}>Seat {seat}</li>
                            ))}
                        </ul>
                    </div>
                    { !selectionChanged && (
                    <div className="total-summary">
                        <h2>Total Amount</h2>
                        <p>${amount.toFixed(2)}</p>
                    </div>
                    )}
                    <button className="place-order-button" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
