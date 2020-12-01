import { take, put, call } from 'redux-saga/effects';

import {
  GAME_AUTO_CAPTURE_POKEMON,
  GAME_CLICK_ONE_BUTTON,
  GAME_LINK_EXCHANGE,
  GAME_LINK_NETWORK,
  GAME_START_EXCHANGE,
  GAME_STOP_ACTIVE
} from '../action-types/game.type';
import gameAction from '../actions/game.action';
import gameService from '../../services/game.service';

function* gameApiWatch() {
  while (true) {
    const pattern = [
      GAME_CLICK_ONE_BUTTON,
      GAME_LINK_NETWORK,
      GAME_AUTO_CAPTURE_POKEMON,
      GAME_LINK_EXCHANGE,
      GAME_START_EXCHANGE
    ];
    const { type, payload } = yield take(pattern);
    yield put(gameAction.loadingAction(payload.loading));
    try {
      let response;
      switch (type) {
        case GAME_CLICK_ONE_BUTTON:
          response = yield call(gameService.oneClick, payload.key);
          break;
        case GAME_LINK_NETWORK:
          response = yield call(gameService.linkNetwork);
          break;
        case GAME_AUTO_CAPTURE_POKEMON:
          response = yield call(gameService.autoCapture, payload);
          break;
        case GAME_LINK_EXCHANGE:
          response = yield call(gameService.linkExchange);
          break;
        case GAME_STOP_ACTIVE:
          response = yield call(gameService.stopActive);
          break;
        case GAME_START_EXCHANGE:
          response = yield call(gameService.startExchange);
          break;
        default:
      }
      yield put(gameAction.botResponseAction(response.get('massage')));
    } catch (e) {
      // TODO 点击一下按钮的错误处理
      console.error('oneClickWork error', e);
      yield put(gameAction.botResponseAction('任务失败。。。'));
    }
  }
}

function* gameStopApiWatch() {
  while (true) {
    const { payload } = yield take(GAME_STOP_ACTIVE);
    yield put(gameAction.loadingAction(payload.loading));
    try {
      const response = yield call(gameService.stopActive);
      yield put(gameAction.botResponseAction(response.get('massage')));
    } catch (e) {
      // TODO 点击一下按钮的错误处理
      console.error('oneClickWork error', e);
      yield put(gameAction.botResponseAction('任务失败。。。'));
    }
  }
}

export const gameSaga = [
  gameApiWatch(),
  gameStopApiWatch()
];
