import { v4 as uuidv4 } from 'uuid';
import { SHOW, HIDE } from '../actions/notificationsAction';

export const showNotification =
  (text, type = 'success') =>
  dispatch => {
    const id = uuidv4();
    const notification = {
      id,
      text,
      type,
    };
    dispatch({ type: SHOW, payload: notification });
    setTimeout(() => dispatch({ type: HIDE, payload: id }), 2500);
  };
