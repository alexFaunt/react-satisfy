import React from 'react'
import { Link } from 'react-router'
import { link } from './Links.css'

export default () => (
  <div>
    <h3>Common profile links</h3>
    <Link className={ link } to="/profile/jeff">Jeff</Link>
    <Link className={ link } to="/profile/geoff">Geoff</Link>
    <Link className={ link } to="/profile/geoffrey">Geoffrey</Link>
    <Link className={ link } to="/profile/jeffrey">Jeffrey</Link>
    <Link className={ link } to="/profile/12313">No user</Link>
  </div>
)
