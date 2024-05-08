import { Dispatch } from "react"
import { csrfFetch } from "./csrf"

// taken from forms practice and modified
export const LOAD_EVENTS = 'events/LOAD_EVENTS'
export const CREATE_EVENT = 'events/CREATE_EVENT'
export const UPDATE_EVENT = 'events/UPDATE_EVENT'
export const DELETE_EVENT = 'events/DELETE_EVENT'


export const loadEvents = (events) => ({
    type: LOAD_EVENTS,
    events,
  });

  export const createEvent = (event) => ({
    type: CREATE_EVENT,
    event,
  });

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
  export const getEventDetails = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`);
    const data = await res.json();
    res.data = data;
    if (res.ok) {
      dispatch(detailEvent(data));
      return data
    } else {
      throw res;
    }
  };

  const eventReducer = (
    state = { events: {}, currEvent: {}},
    action
  ) => {
    switch (action.type) {
        case LOAD_EVENTS:
            const eventState = {};
            action.events.forEach(e => {
                eventState[e.id] = e
            })
            return {...state, events: eventState}
        default:
            return state
    }
  }

  export default eventReducer;
