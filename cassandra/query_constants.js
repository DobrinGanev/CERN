export const GET_USER_BY_USERNAME = "SELECT * FROM users WHERE username = ?";
export const SET_USER = "INSERT INTO users (username, firstname, lastname, email, password, created_date) VALUES (?,?,?,?,?,?)";
export const GET_VIDEOS_BY_USERNAME = "SELECT videoid FROM username_video_index WHERE username = ?";
export const GET_VIDEO_BY_ID = "SELECT * FROM videos WHERE videoid = ?";
export const GET_VIDEOS_BY_TAG = "SELECT videoid FROM tag_index WHERE tag = ?";
export const GET_RATING_BY_VIDEO = "SELECT rating_counter, rating_total FROM  video_rating WHERE videoid = ?";
export const SET_COMMENT_BY_VIDEO = "   INSERT INTO comments_by_video (videoid,username,comment_ts, comment) VALUES (?,?,?,?)";
export const SET_COMMENT_BY_USERNAME = "   INSERT INTO comments_by_user (videoid,username,comment_ts, comment) VALUES (?,?,?,?)";
export const GET_COMMENT_BY_VIDEOID = "SELECT videoid,username,comment_ts, comment FROM  comments_by_video WHERE videoid = ?";
export const GET_COMMENT_BY_USERNAME = "SELECT videoid,username,comment_ts, comment FROM  comments_by_user WHERE username = ?";
