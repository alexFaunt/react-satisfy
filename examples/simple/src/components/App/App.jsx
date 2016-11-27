import React from 'react'
import { Match, Miss } from 'react-router'

import Home from '../Home/Home'
import NotFound from '../NotFound/NotFound'
import Profile from '../Profile/Profile'

import styles from './App.css'

export default () => (
  <div className={ styles.app }>
    <main className={ styles.main }>
      <Match pattern="/" exactly component={ Home } />
      <Match pattern="/profile/:id" exactly component={ Profile } />
      <Miss component={ NotFound } />
    </main>
  </div>
)
