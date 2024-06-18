import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { currentPostSelector } from "../../store/post";
import { loadSessionEventsThunk, deleteEventThunk } from "../../store/event";
import { getUserPosts } from "../../store/post";
import { NavLink } from 'react-router-dom';


const MyPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(currentPostSelector);
    const user = useSelector(state => state.session.user);
    const allCurEvents = useSelector(state => state.events.events);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const redirectToEvent = (e) => {
        e.stopPropagation();
        history.push(`/events/${post.event.id}`);
      };

    const handleDelete = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await dispatch(deleteEventThunk(eventId));
                if (response.message === 'Successfully deleted') {
                    alert('Event deleted successfully');
                } else {
                    setError(response);
                }
            } catch (err) {
                const data = await err.json();
                alert(`{${data.message}}`)
            }
        }
    };
     const handleEditClick = (e) => {
        e.stopPropagation();
        // e.preventDefault();
        // dispatch(focusPost(post));
        // dispatch(showModal(EDIT_POST_MODAL));
      };

      const handleDeleteClick = async (e) => {
        // e.stopPropagation();
        // e.preventDefault();
        // await dispatch(removePost(post.id));
        // await dispatch(getCurrentReplies());
      };

    useEffect(() => {
        if (user && user.id) {
            setLoading(true);
            dispatch(getUserPosts(user.id)).then(() => {
                setLoading(false);
            });
        }
    }, [dispatch, user]);

    if (loading) {
        return <div className="loading">Loading Posts...</div>;
    }

    const fixDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "GMT",
        });
      };


    return (
        <div className="post-inner">
            {Object.values(posts).map(post => (
                <div key={post.id} className="user-post-upper">
                    <div className="post-event-info" onClick={() => redirectToEvent(post)}>
                        <img
                            src={post.event.img_url}
                            className="post-event-img"
                        />
                        <p className="post-event-name">{post.event.name}</p>
                    </div>
                    <div className="profile-post-actions">
                        <span className="post-action" onClick={handleEditClick}>
                            Edit Post
                        </span>
                        <span className="post-action" onClick={handleDeleteClick}>
                            Delete Post
                        </span>
                    </div>
                    <div className="post-main">
                        <p className="post-title">{post.title}</p>
                        <p className="post-body">{post.body}</p>
                        <p className="post-date">{fixDate(post.time)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyPosts;
