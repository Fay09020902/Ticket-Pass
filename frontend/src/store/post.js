import { csrfFetch } from "./csrf";

// constants
export const SET_EVENT_POSTS = "posts/SET_EVENT_POSTS";
export const SET_USER_POSTS = "posts/SET_USER_POSTS";
export const SET_CURRENT_POSTS = "posts/SET_CURRENT_POSTS";
export const NEW_POST = "posts/NEW_POST";
export const EDIT_POST = "posts/EDIT_POST";
export const DELETE_POST = "posts/DELETE_POST";
export const FOCUS_POST = "posts/FOCUS_POST";

// selectors
export const eventPostsSelector = (state) => state.posts.event;
export const userPostSelector = (state) => state.posts.user;
export const currentPostSelector = (state) => state.posts.current;
// export const focusPostSelector = (state) => state.posts.focus;

// action creators
// set all posts for an event
export function setEventPosts(posts) {
  return {
    type: SET_EVENT_POSTS,
    posts,
  };
}
// set all posts for a user
export function setUserPosts(posts) {
  return {
    type: SET_USER_POSTS,
    posts,
  };
}
// set current user's posts
export function setCurrentPosts(posts) {
  return {
    type: SET_CURRENT_POSTS,
    posts,
  };
}
// new post for an event
export function newPost(post) {
  return {
    type: NEW_POST,
    post,
  };
}
// edit a post
export function editPost(post) {
  return {
    type: EDIT_POST,
    post,
  };
}
// delete a post
export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId,
  };
}
// set a post as the focus post
export function focusPost(post) {
  return {
    type: FOCUS_POST,
    post,
  };
}

// thunks
// fetch an event's posts thunk
export const getEventPosts = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}/posts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setEventPosts(data.posts));
    return data;
  }
  return res;
};
// fetch a user's posts thunk
export const getUserPosts = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}/posts`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setUserPosts(data.posts));
    return data;
  }
  return res;
};
// fetch the current users's posts thunk
export const getCurrentPosts = () => async (dispatch) => {
  const res = await csrfFetch("/api/my/posts");
  if (res.ok) {
    const data = await res.json();
    dispatch(setCurrentPosts(data.posts));
    return data;
  }
  return res;
};
// create a new post thunk
export const createPost = (post) => async (dispatch) => {
  const { userId, eventId, title, body } = post;
  const res = await csrfFetch(`/api/events/${eventId}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(newPost(data));
    return data;
  }
  return res;
};
// update a post thunk
export const updatePost = (post) => async (dispatch) => {
  const { postId, title, body } = post;
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(editPost(data));
    return data;
  }
  return res;
};

// delete post thunk
export const removePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deletePost(postId));
    return data;
  }
  return res;
};

// reducer
const postsReducer = (
  state = { posts: {}, current: {}, event: {} },
  action
) => {
  const newState = { ...state };
  newState.posts = { ...state.posts };
  newState.current = { ...state.current };
  newState.event = {...state.event}
  switch (action.type) {
    case NEW_POST: {
      newState.posts[action.post.id] = {...action.post}
      return newState
    }
    case SET_USER_POSTS: {
      const userPosts = {};
      action.posts.forEach((post) => {
        userPosts[post.id] = post;
      });
      newState.current = userPosts;
      newState.posts = { ...newState.posts, ...userPosts }; // Ensures the posts state is updated
      return newState;
    }
    case EDIT_POST:
      {
        console.log("post data: ", action.post)
        newState.current[action.post.id] = action.post;
      newState.posts[action.post.id] = action.post;
      return newState
      }
    case DELETE_POST:
      {
        delete newState.posts[action.postId];
        delete newState.event[action.postId];
        delete newState.current[action.postId];
        return newState
      }
    // case FOCUS_POST:
    //   {newState.focus = action.post;
    //   }
    default:
      return state;
  }
}

export default postsReducer;
