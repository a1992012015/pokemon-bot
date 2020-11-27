import { take, put, call } from 'redux-saga/effects';

import { GAME_AUTO_CAPTURE_POKEMON, GAME_CLICK_ONE_BUTTON, GAME_LINK_NETWORK } from '../action-types/game.type';
import gameAction from '../actions/game.action';
import gameService from '../../services/game.service';

function* oneClickWatch() {
  while (true) {
    const { payload } = yield take([GAME_CLICK_ONE_BUTTON]);
    yield put(gameAction.loadingAction(payload.loading));
    try {
      const response = yield call(gameService.oneClick, payload.key);
      yield put(gameAction.botResponseAction(response.massage));
    } catch (e) {
      // TODO 点击一下按钮的错误处理
      console.error('oneClickWork error', e);
      yield put(gameAction.botResponseAction('任务失败。。。'));
    }
  }
}

function* linkNetworkWatch() {
  while (true) {
    const { payload } = yield take([GAME_LINK_NETWORK]);
    yield put(gameAction.loadingAction(payload.loading));
    try {
      const response = yield call(gameService.linkNetwork);
      yield put(gameAction.botResponseAction(response.massage));
    } catch (e) {
      // TODO 点击一下按钮的错误处理
      console.error('oneClickWork error', e);
      yield put(gameAction.botResponseAction('任务失败。。。'));
    }
  }
}

function* autoCaptureWatch() {
  while (true) {
    const { payload } = yield take([GAME_AUTO_CAPTURE_POKEMON]);
    yield put(gameAction.loadingAction(payload.loading));
    try {
      const response = yield call(gameService.autoCapture, payload);
      yield put(gameAction.botResponseAction(response.massage));
    } catch (e) {
      // TODO 点击一下按钮的错误处理
      console.error('oneClickWork error', e);
      yield put(gameAction.botResponseAction('任务失败。。。'));
    }
  }
}

export const gameSaga = [
  oneClickWatch(),
  linkNetworkWatch(),
  autoCaptureWatch()
];
