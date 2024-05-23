import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './SelectSeats.css';
import { setSelectionChanged, resetSubtotal, clearSelectedSeats, fetchSeats, selectSeat, deselectSeat } from '../../store/seats';

function SelectSeats() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const curEvent = useSelector(state => state.events.currEvent);
  const seats = useSelector(state => state.seats.seats);
  const selectedSeats = useSelector(state => state.seats.selectedSeats);
  const [loading, setLoading] = useState(true);

  const handleSelectSeat = async (id, isSelected, price) => {
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
      dispatch(setSelectionChanged(false));
      dispatch(clearSelectedSeats());
      dispatch(resetSubtotal());
      await dispatch(fetchSeats(eventId));
      setLoading(false);
    };

    clearAndFetchSeats();
  }, [dispatch, eventId]);

  return (
    <div className="selectseat_container">
      <div className="seatselect_title">Select Seats</div>
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
      {selectedSeats.length > 0 ? (
        <NavLink to={`/events/${eventId}/tickets/checkout`} className='buy-now-button'>Buy Now</NavLink>
      ) : (
        <button className='buy-now-button disabled' disabled>Buy Now</button>
      )}
    </div>
  );
}

export default SelectSeats;
