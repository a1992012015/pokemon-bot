import { Map, List } from 'immutable';
import { notification } from 'antd';

import { GAME_ACTION_RESPONSE, GAME_LOADING } from '../action-types/game.type';

const gameInit = Map({
  loading: 0,
  disabled: false,
  massages: List()
});

export function gameReducer(state = gameInit, action) {
  switch (action.type) {
    case GAME_ACTION_RESPONSE:
      notification.open({
        message: '操作完成',
        description: action.payload.massage,
        onClick: () => {
          console.log('Notification Clicked!');
        }
      });
      if (state.getIn(['massages', state.get('massages').size - 1]) !== action.payload.massage) {
        const massages = state.get('massages').push(action.payload.massage);
        return state.set('loading', 0).set('disabled', false).set('massages', massages);
      } else {
        return state.set('loading', 0).set('disabled', false);
      }
    case GAME_LOADING:
      return state.set('loading', action.payload.loading).set('disabled', true);
    default:
      return state;
  }
}