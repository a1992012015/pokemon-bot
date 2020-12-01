import {
  GAME_ACTION_RESPONSE,
  GAME_AUTO_CAPTURE_POKEMON,
  GAME_CLICK_ONE_BUTTON, GAME_LINK_EXCHANGE,
  GAME_LINK_NETWORK,
  GAME_LOADING,
  GAME_LOADING_MAP, GAME_START_EXCHANGE,
  GAME_STOP_ACTIVE
} from '../action-types/game.type';

class GameAction {

  /**
   * 点击一个游戏按键
   * @param loading number 表示正在被运行的任务
   * @param key string 需要点击的按钮的名字
   * @returns {{payload: {key: string}, type: string}}
   */
  clickButtonAction = (loading, key) => {
    return {
      type: GAME_CLICK_ONE_BUTTON,
      payload: { loading, key }
    };
  };

  /**
   * 连接网络
   * @returns {{type: string}}
   */
  linkNetworkAction = () => {
    return {
      type: GAME_LINK_NETWORK,
      payload: { loading: GAME_LOADING_MAP.LINK_NETWORK }
    };
  };

  /**
   * 自动战斗捕获精灵
   * @param isRestart string 是否要重启游戏
   * @param battleTime number 战斗持续的时间
   * @returns {{payload: {battle_time: *, restart: *, loading: string}, type: string}}
   */
  autoCaptureAction = (isRestart, battleTime) => {
    return {
      type: GAME_AUTO_CAPTURE_POKEMON,
      payload: { loading: GAME_LOADING_MAP.BATTLE, restart: isRestart, battle_time: battleTime }
    };
  };

  /**
   * 连接交换任务
   * @returns {{payload: {loading: string}, type: string}}
   */
  linkExchangeAction = () => {
    return {
      type: GAME_LINK_EXCHANGE,
      payload: { loading: GAME_LOADING_MAP.LINK_EXCHANGE }
    };
  };

  /**
   * 让switch停止现在有的所有操作
   * @returns {{type: string}}
   */
  stopActiveAction = () => {
    return {
      type: GAME_STOP_ACTIVE,
      payload: { loading: GAME_LOADING_MAP.STOP_ACTIVE }
    };
  };

  /**
   * 让switch开始交换精灵
   * @returns {{payload: {loading: string}, type: string}}
   */
  startExchangeAction = () => {
    return {
      type: GAME_START_EXCHANGE,
      payload: { loading: GAME_LOADING_MAP.START_EXCHANGE }
    };
  }

  loadingAction = (loading) => {
    return {
      type: GAME_LOADING,
      payload: { loading }
    };
  };

  botResponseAction = (massage) => {
    return {
      type: GAME_ACTION_RESPONSE,
      payload: { massage }
    };
  };
}

export default new GameAction();