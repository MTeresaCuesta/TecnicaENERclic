import React from 'react';
import './Login.css';

export function Login() {
  return (
    <div className='divPpal'>
      <img className='fondoLogin' src="/assets/images/login/fondoLogin.png" alt="" />
      <div className='login'>
        <h2 className='welcome'>WELCOME</h2>
        <div style={{ margin: '30px', marginLeft:'5px' }}>
          <label  htmlFor="username">Username:</label>
          <br />
          <input type="text" id="username" placeholder= "Your Username" style={{ display: 'block', marginBottom: '10px' }} />
          
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" placeholder="Your password" style={{ display: 'block', marginBottom: '10px' }} />
          <button className='boton'>Login</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p>Or Sign Up Using</p>
          <div style={{marginTop:'60px'}}>
            <img className='imagenesRrs' src="/assets/images/login/IconTwitter.png" alt="" />
            <img className='imagenesRrs' src="/assets/images/login/IconFacebook.png" alt="" />
            <img className='imagenesRrs' src="/assets/images/login/IconInstagram.png" alt="" />
            <img className='imagenesRrs' src="/assets/images/login/IconWhatsapp.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

