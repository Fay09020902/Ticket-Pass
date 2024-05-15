import { useSelector, useDispatch} from "react-redux";
import { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './SelectSeats.css'
import {updateSeatSelection, fetchSeats, selectSeat, deselectSeat} from '../../store/seats'



function SelectSeats() {
    const dispatch = useDispatch();
    const {eventId} = useParams();
    const curEvent = useSelector(state => state.events.currEvent);
    const seats = useSelector(state => state.seats.seats)

    const handleSelectSeat = async (id, isSelected, price) => {
      try {
        const seat = await dispatch(updateSeatSelection( id, isSelected ));
        if(seat) {
          if (isSelected) {
            dispatch(deselectSeat(id, price))
          }
          else {
            dispatch(selectSeat(id, price))
          }
        }
      } catch(e){
        console.log("errrr ", e)
      }
    };

    useEffect(() => {
      dispatch(fetchSeats(eventId));
    }, [dispatch]);


    return (
        <div className="selectseat_container">
        <div className="seatselect_title">Select Seats</div>
        {seats && (<div className='seat-map'>
            {Object.values(seats).map(seat => (
                            <li
                            onClick={() => handleSelectSeat(seat.id, seat.isSelected, curEvent.price)}
                            key={seat.id}
                            className={`${seat.status ? '' : 'unavailable'} ${seat.isSelected ? 'selected' : ''}`}
                            >
                              <p>{seat.id}</p> <p>{curEvent.price}</p>
                            </li>
                          ))}
        </div>)}
        <NavLink to={`/tickets/${eventId}/checkout`} className='ticketLink'>Buy Now</NavLink>
        </div>
    )
}


export default SelectSeats;
