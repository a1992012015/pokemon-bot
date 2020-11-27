import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import { connect } from 'react-redux';

import { GAME_LOADING_MAP } from '../../redux/action-types/game.type';
import gameAction from '../../redux/actions/game.action';
import styles from './find-send.module.scss';

class FindSeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRestart: '1', // 是否重启游戏
      battleTime: 80 // 战斗持续时间
    };
  }

  linkNetwork = () => {
    this.props.linkNetworkAction();
  };

  autoCapture = () => {
    const { isRestart, battleTime } = this.state;
    this.props.autoCaptureAction(isRestart, battleTime);
  };

  oneClick = (key) => {
    this.props.clickButtonAction(this.getOneClickLoading(key), key);
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
    console.log(game.get('massages'));
    return (
      <div className={styles.container}>
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
  autoCaptureAction: gameAction.autoCaptureAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindSeed);