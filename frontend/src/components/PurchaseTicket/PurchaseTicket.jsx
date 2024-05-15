import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./PurchaseTicket.css"
import {updateSeatAvailability, deselectSeat} from "../../store/seats"

export default function PurchaseTicket() {
	const dispatch = useDispatch();
    const amount = useSelector(state => state.seats.subTotal)
    const curEvent = useSelector(state => state.events.currEvent);
    const selectedSeats = useSelector(state => state.seats.selectedSeats)
    const [total, setTotal] = useState(amount);

	const handlePlaceOrder = async () => {
		try {
			const seats = await dispatch(updateSeatAvailability(selectedSeats));
			if(seats) {
				selectedSeats.forEach(seatId => {
					dispatch(deselectSeat(seatId, curEvent.price));
				  });
			    alert("purchase succeed")
			}
		  } catch(e){
			console.log("errrr ", e)
		  }
	}

    return (
        <>
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
                        <div className="total-summary">
                            <h2>Total Amount</h2>
                            <p>${total.toFixed(2)}</p>
                        </div>
						<button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
        </div>
        </>
    );
}
