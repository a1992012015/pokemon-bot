import RequestService from './request.service';

class GameService extends RequestService {

  /**
   * 让switch点击一个按钮
   * @param key 需要点击的key
   * @returns {Promise<void>}
   */
  oneClick = (key) => {
    return this.defaultRequest.post(`/api/one`, { key });
  };

  /**
   * 让switch连接网络
   * @returns {Promise<void>}
   */
  linkNetwork = () => {
    return this.defaultRequest.get(`/api/link-network`);
  };

  /**
   * 让switch开始战斗捕获精灵
   * @param data 包含了是否要重启游戏和战斗的时间
   * @returns {Promise<void>}
   */
  autoCapture = (data) => {
    return this.defaultRequest.post(`/api/auto-capture`, data);
  };
}

export default new GameService();