import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { currentPostSelector, removePost } from "../../store/post";
// import { deleteEventThunk } from "../../store/event";
import { getUserPosts } from "../../store/post";
import UpdatePostModal from '../UpdatePostModal/UpdatePostModal'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import { NavLink } from 'react-router-dom';


const MyPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(currentPostSelector);
    const user = useSelector(state => state.session.user);
    // const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const redirectToEvent = (e) => {
        e.stopPropagation();
        history.push(`/events/${posts.event.id}`);
      };

      const handleDeleteClick = async (e, post) => {
        e.stopPropagation();
        e.preventDefault();
        await dispatch(removePost(post.id));
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


    if (Object.keys(posts).length === 0) {
        return <div className="no-tickets">No Posts Available</div>;
    }
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
                        <span className="post-action">
                                <OpenModalButton className="update-post-button"
                            buttonText="Edit Post"
                            modalComponent={<UpdatePostModal postId={post.id}/>}
                />
                        </span>
                        <span className="post-action" onClick={(e) => handleDeleteClick(e, post)}>
                            Delete Post
                        </span>
                    </div>
                    <div className="post-main">
                        <p className="post-title">{post.title}</p>
                        <p className="post-body">{post.body}</p>
                        <p className="post-date">{fixDate(post.time)}</p>
                    </div>
                    {/* <div>{error}</div> */}
                </div>
            ))}
        </div>
    );
}

export default MyPosts;
