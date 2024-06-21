export const SHOW_MODAL = "ui/SHOW_MODAL";
export const HIDE_MODAL = "ui/HIDE_MODAL";

// selectors
export const modalSelector = (state) => state.ui.modal;

// SHOW_MODAL action creator
export function showModal(modal) {
  // disable background scrolling while modal is open
  document.querySelector("body").style.overflow = "hidden";

  return {
    type: SHOW_MODAL,
    modal,
  };
}

// HIDE_MODAL action creator
export function hideModal() {
  // reenable background page scrolling when modal is closed
  document.querySelector("body").style.overflow = "auto";

  return {
    type: HIDE_MODAL,
  };
}

export default function uiReducer(state = { modal: null }, action) {
  const newState = { ...state };

  switch (action.type) {
    case SHOW_MODAL:
      newState.modal = action.modal;
      break;
    case HIDE_MODAL:
      newState.modal = null;
      break;

    default:
      break;
  }

  return newState;
}
