import React from "react";

const Logo = ({theme}) => (
  <div className='logo'>
    <img className={theme} alt="Quick reply icon" />
    <h1>Dispatch</h1>
  </div>
)

export default Logo;