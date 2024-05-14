export const SELECT_SEAT = 'seats/SELECT_SEAT'
export const DESELECT_SEAT = 'seats/DESELECT_SEAT'
export const LOAD_SEATS = 'seats/LOAD_SEATS'



// export const fetchSeats = () => async dispatch => {
//     try {
//         const response = await fetch('/api/seats');
//         const data = await response.json();
//         dispatch({ type: 'FETCH_SEATS_SUCCESS', payload: data });
//     } catch (error) {
//         dispatch({ type: 'FETCH_SEATS_ERROR', payload: error });
//     }
// };

export const loadSeats = seats => ({
    type: 'LOAD_SEATS',
    payload: seats
});

// Action to select a seat
export const selectSeat = seatId => ({
    type: 'SELECT_SEAT',
    payload: seatId
});

// Action to deselect a seat
export const deselectSeat = seatId => ({
    type: 'DESELECT_SEAT',
    payload: seatId
});

export const available = (seatId, isAvailable) => ({
    type: 'SET_AVAILABILITY',
    payload: {seatId, isAvailable}
});

const seatsReducer = (
    state = {
        seats: {},
        selectedSeats: [],  // Array of IDs of selected seats
        seatAvailability: {},  // Object with seat IDs as keys and availability as values
        errors: null
    },
    action
) => {
    switch (action.type) {
        case 'LOAD_SEATS':
            return {
                ...state,
                seats: action.payload
            };
        case 'SELECT_SEAT':
            const updatedSeats  = { ...state.seats };
            if(!updatedSeats[action.payload].isSelected) {
                updatedSeats[action.payload] = {
                    ...updatedSeats[action.payload],
                    isSelected: true
                };
                return {
                    ...state,
                    seats: updatedSeats,
                    selectedSeats: [...state.selectedSeats, action.payload]
                };
            }
			return state;
        case 'DESELECT_SEAT':
            const deselectedSeats = { ...state.seats };
            if (deselectedSeats[action.payload].isSelected) {
                deselectedSeats[action.payload] = {
                    ...deselectedSeats[action.payload],
                    isSelected: false
                };
                return {
                    ...state,
                    seats: deselectedSeats,
                    selectedSeats: state.selectedSeats.filter(id => id !== action.payload)
                };
            }
            return state;
        case 'SET_AVAILABILITY':
            return {
                ...state,
                seatAvailability: {
                    ...state.seatAvailability,
                    [action.payload.seatId]: action.payload.isAvailable
                }
            };
        default:
            return state;
    }
};

export default seatsReducer;
