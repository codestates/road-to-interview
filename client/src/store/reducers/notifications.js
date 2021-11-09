import { SHOW, HIDE } from '../actions/notificationsAction';

const initalState = {
  notifications: [],
};

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case SHOW:
      return {
        notifications: [action.payload, ...state.notifications],
      };
    case HIDE:
      return {
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    default:
      return state;
  }
}
