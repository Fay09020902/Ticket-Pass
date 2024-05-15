export const LOAD_CURRENT_TICKETS = 'tickets/LOAD_CURRENT_TICKETS';
export const CREATE_TICKETS = 'tickets/CREATE_TICKETS'
import { csrfFetch } from "./csrf";

export const loadCurTickets = (tickets) => ({
  type: LOAD_CURRENT_TICKETS,
  tickets,  //tickets is an object like the JSON structure
});

  export const createTickets = (tickets) => ({
    type: CREATE_TICKETS,
    payload: tickets,
  });

  export const loadCurTicketsThunk = () => async (dispatch) => {
    const res = await fetch('/api/tickets/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(loadCurTickets(data));
        return data;
    }
};

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
  const initialState = {}
  const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_CURRENT_TICKETS: {
        const newState = Object.assign({}, state);
        action.tickets.forEach(t => {
        newState[t.id] = t}
            )
        return newState;
        }
      default:
        return state;
    }
};

export default ticketReducer;
