import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from '../../store/post';
// import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './NewPostModal.css';

function NewPostModal({eventId}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const getTitleError = () => {
    if (!title) return "A post title is required";
    return "";
  };

  const getBodyError = () => (body ? "" : "A post body is required");
  useEffect(() => {
    if (hasSubmitted) {
      setTitleError(getTitleError());
      setBodyError(getBodyError());
    }
  }, [title, body, hasSubmitted]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // front end validations
    const titleValidationError = getTitleError();
    const bodyValidationError = getBodyError();

    setTitleError(titleValidationError);
    setBodyError(bodyValidationError);

    // if there are errors dont make request
    if (!titleValidationError && !bodyValidationError) {
      // submit the post
      if (!user) {
        alert("Please login to post")
      }
      const post = { userId: user.id, eventId:eventId, title, body };
      const data = await dispatch(createPost(post));
      if (data.message) {
        setErrors([data.message]);
      } else {
        dispatch((closeModal));
      }
    }
  };

  return (
    <>
      <form className='NewPostModal' onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="title">Post title</label>
          <input
            name="title"
            type="text"
            placeholder="Your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title" className="field-error">
            {titleError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="body">Post body</label>
          <textarea
            name="body"
            placeholder="Your post"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label htmlFor="body" className="field-error">
            {bodyError}
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="submit" className="field-error">
           {errors}
          </label>
          <button type="submit" className="form-submit-button">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPostModal;
