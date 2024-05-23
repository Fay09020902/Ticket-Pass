import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './UpdateSeat.css';
import { getEventDetails } from "../../store/event";
import { setSelectionChanged, resetSubtotal, clearSelectedSeats, fetchSeats, selectSeat, deselectSeat } from '../../store/seats';

function UpdateSeat() {
  const dispatch = useDispatch();
  const { eventId, ticketId } = useParams();
  const curEvent = useSelector(state => state.events.currEvent);
  const seats = useSelector(state => state.seats.seats);
  const selectedSeats = useSelector(state => state.seats.selectedSeats);
  const currentSeat = useSelector(state => state.seats.currentSeat);
  const [loading, setLoading] = useState(true);

  const handleSelectSeat = async (id, isSelected, price) => {
    if (!isSelected && selectedSeats.length > 0) {
      const currentSelectedId = selectedSeats[0];
      dispatch(deselectSeat(currentSelectedId, curEvent.price));
    }
    try {
      if (isSelected) {
        dispatch(deselectSeat(id, price));
      } else {
        dispatch(selectSeat(id, price));
      }
    } catch (e) {
      alert("Please login to purchase");
    }
  };

  useEffect(() => {
    const clearAndFetchSeats = async () => {
      setLoading(true);
      dispatch(setSelectionChanged(true));
      dispatch(getEventDetails(eventId));
      dispatch(clearSelectedSeats());
      dispatch(resetSubtotal());
      await dispatch(fetchSeats(eventId));
      setLoading(false);
    };

    clearAndFetchSeats();
  }, [dispatch, eventId]);

  return (
    <div className="selectseat_container">
      <div className="seatselect_title">Update Seats</div>
      <div className="seat-legend">
        <div className="seat-legend-item">
          <div className="seat-legend-box selected"></div>
          <span>Selected Seat</span>
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box unavailable"></div>
          <span>Unavailable Seat</span>
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box available"></div>
          <span>Available Seat</span>
        </div>
      </div>
      {currentSeat && <div className="current-seat-display">Current Seat: {currentSeat}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        seats && (
          <div className='seat-map'>
            {Object.values(seats).map(seat => (
              <li
                onClick={() => handleSelectSeat(seat.id, selectedSeats.includes(seat.id), curEvent.price)}
                key={seat.id}
                className={`${seat.status ? '' : 'unavailable'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
              >
                <p>{seat.id}</p> <p>${curEvent.price}</p>
              </li>
            ))}
          </div>
        )
      )}
      {selectedSeats && selectedSeats.length > 0 ? (
        <NavLink to={`/events/${eventId}/tickets/${ticketId}/checkout`} className='buy-now-button'>Update Now</NavLink>
      ) : (
        <button className='buy-now-button disabled' disabled>Update Now</button>
      )}
    </div>
  );
}

export default UpdateSeat;
