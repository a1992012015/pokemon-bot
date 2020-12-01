import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Menu } from 'antd';

import { homeMenu } from './configs/home-menu.onfig';
import { loadable } from './components/HOComponent/loadable';
import { wrap } from './components/HOComponent/wrap';
import { SwitchDefault } from './components/HOComponent/switch-default';
import { BaseComponent } from './base-class/should-component-update';

import styles from './App.module.scss';

const FindSeed = loadable(() => import('./pages/bot-controller/bot-controller'));

class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      defaultPath: this.getRouterPath()
    };
  }

  handleClick = (path) => {
    const { history } = this.props;
    history.push({ pathname: path.key });
  };

  getRouterPath = () => {
    const { location } = this.props;
    const path = homeMenu.filter(i => location.pathname.includes(i.key));
    return path.length ? path[0].key : homeMenu[0].key;
  };

  render() {
    const { defaultPath } = this.state;
    const { history } = this.props;
    return (
      <div className={styles.App}>
        <Menu
          onClick={this.handleClick}
          className={styles.AppMenu}
          defaultSelectedKeys={defaultPath}
          mode='horizontal'
        >
          {this.renderHomeMenu()}
        </Menu>

        <SwitchDefault history={history}>
          <Route exact={true} path='/bot-controller' component={wrap(FindSeed)}/>
          <Redirect exact={true} from='/' to='/find-seed'/>
        </SwitchDefault>
      </div>
    );
  }

  renderHomeMenu = () => {
    return homeMenu.map((menu) => {
      return (
        <Menu.Item key={menu.key}>
          {menu.name}
        </Menu.Item>
      );
    });
  };
}

export default App;
