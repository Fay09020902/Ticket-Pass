import { csrfFetch } from "./csrf";

// taken from forms practice and modified
export const LOAD_EVENTS = 'events/LOAD_EVENTS'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const DELETE_EVENT = 'events/DELETE_EVENT'
export const EVENT_DETAILS = 'events/EVENT_DETAILS'

export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events,
  });

  export const createEvent = (event) => ({
    type: CREATE_EVENT,
    event,
  });

  export const detailEvent = (event) => ({
    type: EVENT_DETAILS,
    event
  })

  export const updateEvent = (event) => ({
    type:   UPDATE_EVENT,
    event,
  });

  export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId,
  });


  export const getEvents = () => async dispatch => {
    const res = await fetch('/api/events')
    const data =await res.json()
    res.data = data;
    if (res.ok){
      dispatch(loadEvents(data))
    }else{
      throw res
    }
  }

  export const addEventThunk = (event) => async dispatch => {
    const response = await csrfFetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    if (response.ok) {
      const form = await response.json();
      dispatch(createEvent(form));
      return form;
    }
  }

  export const getEventDetails = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`);
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(detailEvent(data));
      return data
    } else {
      throw new Error(data.message);
    }
  };

  const eventReducer = (
    state = { events: {}, currEvent: {} },
    action
) => {
    switch (action.type) {
        case LOAD_EVENTS: {
            const eventState = {};
            action.events.forEach(e => {
                eventState[e.id] = e;
            });
            return {...state, events: eventState};
        }
        case CREATE_EVENT: {
          const newState = {...state}
          newState.events[action.event.id] = {...action.event}
          return newState
        }
        case EVENT_DETAILS: {
          return { ...state, currEvent: action.event };
        }
        default:
            return state;
    }
};

export default eventReducer;
