export const LOAD_CURRENT_TICKETS = 'tickets/LOAD_CURRENT_TICKETS';
export const CREATE_TICKETS = 'tickets/CREATE_TICKETS'
import { csrfFetch } from "./csrf";

export const loadCurTickets = (tickets) => ({
    type: LOAD_CURRENT_TICKETS,
    payload: tickets,
  });

  export const createTickets = (tickets) => ({
    type: CREATE_TICKETS,
    payload: tickets,
  });

  export const loadCurTicketsThunk = () => async (dispatch) => {
    const res = await fetch('/api/tickets/current');
    const data = await res.json();
    res.data = data;
    // {tickets:7:{id: 7, eventId: 1, userId: 1, seatId: 12, createdAt: '2024-05-15T06:36:20.191Z', …}
    console.log(data)
    if (res.ok) {
      dispatch(loadCurTickets(data));
      return data
    }
  }


  export const addTicketsThunk = ({eventId, userId, seats}) => async () => {
    const response = await csrfFetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({eventId, userId, seats})
    });
    if (response.ok) {
      const tickets = await response.json();
      return tickets;
    }
  }

  const ticketsReducer = (
    state = {
        tickets: {}
    },
    action
) => {
    switch (action.type) {
        case 'LOAD_CURRENT_TICKETS': {
          return {
            ...state,
            tickets: {
                ...state.tickets,
                ...action.payload
            }
        };
        }
        default:
            return state;
    }
};

export default ticketsReducer;
