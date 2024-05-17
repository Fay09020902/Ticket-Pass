import { useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './UpdateSeat.css'
import { getEventDetails } from "../../store/event";
import {setSelectionChanged, resetSubtotal, clearSelectedSeats, fetchSeats, selectSeat, deselectSeat} from '../../store/seats'



function UpdateSeat() {
    const dispatch = useDispatch();
    const {eventId, ticketId} = useParams();
    const curEvent = useSelector(state => state.events.currEvent);
    const seats = useSelector(state => state.seats.seats)
    const selectedSeats = useSelector(state => state.seats.selectedSeats)


    const handleSelectSeat = async (id, isSelected, price) => {
      // If trying to select a seat and there's already another seat selected
      if(!isSelected && selectedSeats.length > 0) {
        const currentSelectedId = selectedSeats[0];
        // await dispatch(updateSeatSelection(currentSelectedId, false));
        dispatch(deselectSeat(currentSelectedId, curEvent.price));
      }
      try {
        // const seat = await dispatch(updateSeatSelection( id, isSelected ));
          if (isSelected) {
            dispatch(deselectSeat(id, price))
          }
          else {
            dispatch(selectSeat(id, price))
          }
      } catch(e){
        alert("Please login to purchase")
      }
    };
    // const handleSelectSeat = async (id, isSelected, price) => {
    //   try {
    //     // Toggle selection in the Redux store
    //     if (isSelected) {
    //       dispatch(deselectSeat(id, price));
    //     } else {
    //       dispatch(selectSeat(id, price));
    //     }
    //   } catch(e) {
    //     alert("Please login to purchase");
    //   }
    // };

    useEffect(() => {
      dispatch(setSelectionChanged(true))
      dispatch(getEventDetails(eventId));
      dispatch(clearSelectedSeats());
      dispatch(resetSubtotal());
      dispatch(fetchSeats(eventId));

  }, [dispatch, eventId]);


    return (
        <div className="selectseat_container">
        <div className="seatselect_title">Update Seats</div>
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
        {selectedSeats && selectedSeats.length > 0 ? (
              <NavLink to={`/events/${eventId}/tickets/${ticketId}/checkout`} className='buy-now-button'>Update Now</NavLink>
            ) : (
              <button className='buy-now-button disabled' disabled>Update Now</button>
            )}
        </div>
    )
}


export default UpdateSeat;
