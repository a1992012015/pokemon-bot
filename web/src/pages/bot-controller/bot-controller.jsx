import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import { connect } from 'react-redux';

import { GAME_LOADING_MAP } from '../../redux/action-types/game.type';
import gameAction from '../../redux/actions/game.action';
import styles from './bot-controller.module.scss';

class BotController extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRestart: '0', // 是否重启游戏
      battleTime: 80 // 战斗持续时间
    };
  }

  linkNetwork = () => {
    this.props.linkNetworkAction();
  };

  stopActive = () => {
    this.props.stopActiveAction();
  };

  autoCapture = () => {
    const { isRestart, battleTime } = this.state;
    this.props.autoCaptureAction(isRestart, battleTime);
  };

  oneClick = (key) => {
    this.props.clickButtonAction(this.getOneClickLoading(key), key);
  };

  linkExchange = () => {
    this.props.linkExchangeAction();
  };

  startExchange = () => {
    this.props.startExchangeAction();
  };

  getOneClickLoading = (key) => {
    switch (key) {
      case 'Button B':
        return GAME_LOADING_MAP.B;
      default:
        return GAME_LOADING_MAP.A;
    }
  };

  restartGame = (event) => {
    this.setState({ isRestart: event });
  };

  changeBattleTime = (event) => {
    const { value } = event.target;
    this.setState({ battleTime: Number(value) });
  };

  render() {
    const { game } = this.props;
    const { isRestart, battleTime } = this.state;
    const disabled = game.get('disabled');
    const loading = game.get('loading');
    return (
      <div className={styles.container}>
        <div className={styles.action}>
          <div className={styles.options}>
            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.A}
                    type="primary"
                    onClick={() => this.oneClick('Button A')}>A 一下</Button>

            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.B}
                    type="primary"
                    onClick={() => this.oneClick('Button B')}>B 一下</Button>
          </div>

          <div className={styles.options}>
            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.LINK_NETWORK}
                    type="primary"
                    onClick={this.linkNetwork}>连接网络</Button>

            <Button className={styles.item}
                    loading={loading === GAME_LOADING_MAP.STOP_ACTIVE}
                    type="primary"
                    onClick={this.stopActive}>中断操作</Button>
          </div>

          <div className={styles.options}>
            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.BATTLE}
                    type="primary"
                    onClick={this.autoCapture}>捕获精灵</Button>

            <Select className={styles.item} defaultValue={isRestart} onChange={this.restartGame}>
              <Select.Option value="1">重启游戏</Select.Option>
              <Select.Option value="0">不重启游戏</Select.Option>
            </Select>

            <Input className={styles.item} defaultValue={battleTime} onChange={this.changeBattleTime}/>
          </div>

          <div className={styles.options}>
            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.LINK_EXCHANGE}
                    type="primary"
                    onClick={this.linkExchange}>开始连接</Button>

            <Button className={styles.item}
                    disabled={disabled}
                    loading={loading === GAME_LOADING_MAP.START_EXCHANGE}
                    type="primary"
                    onClick={this.startExchange}>开始交换</Button>
          </div>
        </div>

        <div className={styles.massages}>
          {
            game.get('massages').map((mas, index) => {
              return <p key={`${index}-massages`}>{mas}</p>;
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  };
};

const mapDispatchToProps = {
  linkNetworkAction: gameAction.linkNetworkAction,
  clickButtonAction: gameAction.clickButtonAction,
  autoCaptureAction: gameAction.autoCaptureAction,
  linkExchangeAction: gameAction.linkExchangeAction,
  stopActiveAction: gameAction.stopActiveAction,
  startExchangeAction: gameAction.startExchangeAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BotController);