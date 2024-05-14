import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import './PurchaseTicketPage.css'
import {loadSeats, selectSeat, deselectSeat} from '../../store/seats'



function PurchaseTicketPage() {
    const dispatch = useDispatch();
    const curEvent = useSelector(state => state.events.currEvent);
    const seats = useSelector(state => state.seats.seats)
    const selectedSeats = useSelector(state => state.seats.selectedSeats)


    const handleSelectSeat = (id, isSelected) => {
      if (isSelected) {
        dispatch(deselectSeat(id))
      }
      else {
        dispatch(selectSeat(id))
      }
    };

    const generateGrid = (rows, cols) => {
        const grid = {};
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const cell = {
              id: `${i + 1}${String.fromCharCode(65 + j)}`,
              isOccupied: false,
              isSelected: false,
            };
            grid[`${i + 1}${String.fromCharCode(65 + j)}`] = cell;
          }
        }
        return grid;
      };

    const grid = generateGrid(5, 5);

    useEffect(() => {
      dispatch(loadSeats(grid));
    }, [dispatch]);


    return (
        <div>
        <h2>PurchaseTicketPage</h2>
        {seats && (<div className='seat-map'>
            {Object.values(seats).map(seat => (
                            <li onClick={() => handleSelectSeat(seat.id, seat.isSelected)} key={seat.id} className={seat.isSelected ? 'selected' : ''} >
                              <p>{seat.id}</p> <p>{curEvent.price}</p>
                            </li>
                          ))}
        </div>)}
        <button>Buy now</button>
        </div>
    )
}


export default PurchaseTicketPage;
