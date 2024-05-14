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
export const selectSeat = (seatId, price) => ({
    type: 'SELECT_SEAT',
    payload: {seatId, price}
});

// Action to deselect a seat
export const deselectSeat = (seatId, price)  => ({
    type: 'DESELECT_SEAT',
    payload: {seatId, price}
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
        subTotal: 0
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
            const updatedSeatsSelect = { ...state.seats };
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

        case 'DESELECT_SEAT':
            const updatedSeatsDeselect = { ...state.seats };
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
