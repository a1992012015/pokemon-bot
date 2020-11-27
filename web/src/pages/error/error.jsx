import React from 'react';

import { BaseComponent } from '../../base-class/should-component-update';

import styles from './error.module.scss';

export default class Error extends BaseComponent {
  render() {
    return <div className={styles.error}>This is 404!!!</div>;
  }
}
