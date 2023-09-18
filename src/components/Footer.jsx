import React from 'react'
import NioClassLogo from '../assets/icon.jpeg'


const Footer = () => {
  return (
    <div style={{position: 'absolute', bottom:'0', left: '50%', transform: 'translateX(-50%)', padding:'20px'}}>
        <img src = {NioClassLogo} alt="nioclass-logo" width={50} height={50}/> x <span style={{fontFamily: 'Cedarville Cursive, serif', fontWeight: 'bold', color: '#e02d51', fontSize: '25px'}}>Mayank Jain</span>
    </div>
  )
}

export default Footer