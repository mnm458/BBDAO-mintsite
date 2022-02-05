/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Link from '@mui/material/Link';
import logo from './Logo With Crown.png'
import './index.css'

export default function Navbar() {

  return (
    <div>
    <div className='logo'>
      <Link href="https://www.billionaireboysdao.com/#">
        <img src={logo} className='logo' />
      </Link>
    </div>
    </div>
  )
}
