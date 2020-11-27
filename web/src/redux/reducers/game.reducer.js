import { Map, List } from 'immutable';
import { GAME_ACTION_RESPONSE, GAME_LOADING } from '../action-types/game.type';

const gameInit = Map({
  loading: 0,
  disabled: false,
  massages: List()
});

export function gameReducer(state = gameInit, action) {
  switch (action.type) {
    case GAME_ACTION_RESPONSE:
      return state.set('loading', 0).set('disabled', false).set('massages', gameInit.get('massages').push());
    case GAME_LOADING:
      return state.set('loading', action.payload.loading).set('disabled', true);
    default:
      return state;
  }
}