export const SELECT_SEAT = 'seats/SELECT_SEAT'
export const DESELECT_SEAT = 'seats/DESELECT_SEAT'
export const SELECT_SEAT_ONLY = 'seats/SELECT_SEAT_ONLY'
export const DESELECT_SEAT_ONLY = 'seats/DESELECT_SEAT_ONLY'
export const LOAD_SEATS = 'seats/LOAD_SEATS'
export const RESET_SUBTOTAL = 'seats/RESET_SUBTOTAL';
export const SET_SELECTION_CHANGED = 'seats/SET_SELECTION_CHANGED';
export const CLEAR_SELECTED_SEATS = 'seats/CLEAR_SELECTED_SEATS'
import { csrfFetch } from "./csrf";

export const fetchSeats = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}/seats`);
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(loadSeats(data));
      return data
    }
}

//purchase ticket, make status showing sold in database
export const updateSeatAvailability = (selectedSeats) => async () => {
    const response = await csrfFetch(`/api/seats/update-seats`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({selectedSeats})
    });
    if (response.ok) {
        const seats = await response.json();
        return seats;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

//make seats are selected or deselected in database
export const updateSeatSelection = (seatId, isSelected) => async () => {
    const payload = { isSelected };
    const response = await csrfFetch(`/api/seats/${seatId}/update-selection`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const seat = await response.json();
        return seat;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};



export const clearSelectedSeats = () => ({
    type: 'CLEAR_SELECTED_SEATS'
});

export const loadSeats = seats => ({
    type: 'LOAD_SEATS',
    payload: seats
});

export const setSelectionChanged = (v) => ({
    type: SET_SELECTION_CHANGED,
    payload:v
});

// Action to select a seat and update seat store status of selected column
export const selectSeat = (seatId, price) => ({
    type: 'SELECT_SEAT',
    payload: {seatId, price}
});


export const selectSeatOnly = (seatId, price) => ({
    type: 'SELECT_SEAT_ONLY',
    payload: {seatId, price}
});

// Action to deselect a seat and update seat store status of selected column
export const deselectSeat = (seatId, price)  => ({
    type: 'DESELECT_SEAT',
    payload: {seatId, price}
});

export const deselectSeatOnly = (seatId, price)  => ({
    type: 'DESELECT_SEAT_ONLY',
    payload: {seatId, price}
});

export const available = (seatId, isAvailable) => ({
    type: 'SET_AVAILABILITY',
    payload: {seatId, isAvailable}
});


export const resetSubtotal = () => ({
    type: RESET_SUBTOTAL
});

const seatsReducer = (
    state = {
        seats: {},
        selectedSeats: [],  // Array of IDs of selected seats
        seatAvailability: {},  // Object with seat IDs as keys and availability as values
        subTotal: 0,
        selectionChanged: false,
    },
    action
) => {
    switch (action.type) {
        case 'LOAD_SEATS':{
            return {
                ...state,
                seats: action.payload
            }
        }
        case 'SELECT_SEAT':
           { const updatedSeatsSelect = { ...state.seats };
            if (!updatedSeatsSelect[action.payload.seatId].isSelected) {
                updatedSeatsSelect[action.payload.seatId] = {
                    ...updatedSeatsSelect[action.payload.seatId],
                    isSelected: true
                };
                return {
                    ...state,
                    seats: updatedSeatsSelect,
                    selectedSeats: [...state.selectedSeats, action.payload.seatId],
                    subTotal: state.subTotal + action.payload.price
                };
            }
            return state;
            }
        case 'SELECT_SEAT_ONLY': {
            return {
                ...state,
                selectedSeats: [...state.selectedSeats, action.payload.seatId],
                subTotal: state.subTotal + action.payload.price
            };
        }
        case 'DESELECT_SEAT':
            {const updatedSeatsDeselect = { ...state.seats };
            if (updatedSeatsDeselect[action.payload.seatId].isSelected) {
                updatedSeatsDeselect[action.payload.seatId] = {
                    ...updatedSeatsDeselect[action.payload.seatId],
                    isSelected: false
                };
                return {
                    ...state,
                    seats: updatedSeatsDeselect,
                    selectedSeats: state.selectedSeats.filter(id => id !== action.payload.seatId),
                    subTotal: state.subTotal - action.payload.price
                };
            }
            return state;}
        case 'DESELECT_SEAT_ONLY': {
            return {
                ...state,
                selectedSeats: state.selectedSeats.filter(id => id !== action.payload.seatId),
                subTotal: state.subTotal - action.payload.price
            };
        }
        case 'CLEAR_SELECTED_SEATS':{
            return { ...state, selectedSeats: [] };
        }
        case 'SET_AVAILABILITY':
            {return {
                ...state,
                seatAvailability: {
                    ...state.seatAvailability,
                    [action.payload.seatId]: action.payload.isAvailable
                }
            }}
        case 'RESET_SUBTOTAL':
            {
                return {
                ...state,
                subTotal: 0
            }
        }
        case SET_SELECTION_CHANGED:
{            return {
                ...state,
                selectionChanged: action.payload
            } }
        default:
            return state;
    }
};

export default seatsReducer;
