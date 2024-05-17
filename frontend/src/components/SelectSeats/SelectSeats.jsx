import { useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './SelectSeats.css'
import {updateSeatSelection, fetchSeats, selectSeat, deselectSeat} from '../../store/seats'



function SelectSeats() {
  const dispatch = useDispatch();
  const {eventId} = useParams();
  const curEvent = useSelector(state => state.events.currEvent);
  const seats = useSelector(state => state.seats.seats);
  const selectedSeats = useSelector(state => state.seats.selectedSeats);

  const handleSelectSeat = async (id, isSelected, price) => {
    try {
      // Toggle selection in the Redux store
      if (isSelected) {
        dispatch(deselectSeat(id, price));
      } else {
        dispatch(selectSeat(id, price));
      }
    } catch(e) {
      alert("Please login to purchase");
    }
  };

  useEffect(() => {
    dispatch(fetchSeats(eventId));
  }, [dispatch, eventId]);

  return (
      <div className="selectseat_container">
          <div className="seatselect_title">Select Seats</div>
          {seats && (<div className='seat-map'>
              {Object.values(seats).map(seat => (
                  <li
                      onClick={() => handleSelectSeat(seat.id, selectedSeats.includes(seat.id), curEvent.price)}
                      key={seat.id}
                      className={`${seat.status ? '' : 'unavailable'} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                  >
                      <p>{seat.id}</p> <p>{curEvent.price}</p>
                  </li>
              ))}
          </div>)}
          {selectedSeats.length > 0 ? (
              <NavLink to={`/tickets/${eventId}/checkout`} className='buy-now-button'>Buy Now</NavLink>
          ) : (
              <button className='buy-now-button disabled' disabled>Buy Now</button>
          )}
      </div>
  )
}


export default SelectSeats;
