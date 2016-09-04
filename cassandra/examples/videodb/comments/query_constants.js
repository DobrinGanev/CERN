export const SET_COMMENT_BY_VIDEO = "   INSERT INTO comments_by_video (videoid,username,comment_ts, comment) VALUES (?,?,?,?)";
export const SET_COMMENT_BY_USERNAME = "   INSERT INTO comments_by_user (videoid,username,comment_ts, comment) VALUES (?,?,?,?)";
export const GET_COMMENT_BY_VIDEOID = "SELECT videoid,username,comment_ts, comment FROM  comments_by_video WHERE videoid = ?";
export const GET_COMMENT_BY_USERNAME = "SELECT videoid,username,comment_ts, comment FROM  comments_by_user WHERE username = ?";
