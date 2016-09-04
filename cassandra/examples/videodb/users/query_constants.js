export const GET_USER_BY_USERNAME = "SELECT * FROM users WHERE userid = ?";
export const SET_USER = "INSERT INTO users (username, firstname, lastname, email, password, created_date) VALUES (?,?,?,?,?,?)";
