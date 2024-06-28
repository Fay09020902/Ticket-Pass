import { useState } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteEventThunk } from "../../store/event";
import '../DeleteTicketModal/ticketdelete.css'


function DeleteEventModal({eventId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({});


  const handleDelete = (e) => {
    if(e.target.value === 'Yes'){
      return dispatch(deleteEventThunk(eventId))
      .then(closeModal)
      .catch(async err => {
        const data = await err.json();
        setErrors({message:data.message});
     });
    } else {
      dispatch(closeModal)
    }

  };


  return (
    <div className ='review-delete-form-container'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this event?</p>
      {errors && <p className="error-message">{errors.message}</p>}
      <button value="Yes" onClick={handleDelete}>Yes (Delete Event)</button>
       <button value="No" onClick={handleDelete}>No (Keep Event)</button>
    </div>
  );
}

export default DeleteEventModal;
