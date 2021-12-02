import React from "react";
import { Link } from "react-router-dom";

const WorkspaceIndex = props => {
  const {setupWorkspace, currentUser} = props
  return (
    <ul className='workspace-index'>
      {props.workspaces.map((wsp, idx) => (
        <Link 
          className='workspace-bubble' 
          key={idx} to={`/${wsp.id}`}
          onClick={() => setupWorkspace({workspace: wsp.id, user: currentUser})}
        >
          <h1>{wsp.name[0]}</h1>
          <p className='workspace-tooltip'>{wsp.name}</p>
        </Link>
      ))}
      <li className='workspace-bubble'>+</li>
    </ul>
  )
}

export default WorkspaceIndex;