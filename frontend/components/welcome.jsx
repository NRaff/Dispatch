import React from "react";
import { Icons } from "../utils/theme";
import Logo from "./logo";

const Welcome = () => (
  <div className='welcome'>
    <Logo theme={Icons.logo.darkLogo}/>
    <h3>Sign up or login to message friends and colleagues.</h3>
  </div>
)

export default Welcome;