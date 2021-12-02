import React from "react";
import { Link } from "react-router-dom";

const WorkspaceIndex = props => {
  const {setupWorkspace, currentUser, activeWorkspace} = props
  const setActiveWorkspace = (e, workspace) => {
    setupWorkspace({ workspace: workspace.id, user: currentUser })
    let oldActive = document.getElementsByClassName('active-workspace')[0]
    if (oldActive) oldActive.classList.remove('active-workspace')
    e.currentTarget.classList.add('active-workspace')
  }
  return (
    <section className='workspace-container'>
      <ul className='workspace-index'>
        {props.workspaces.map((wsp, idx) => (
          <Link
            className='workspace-bubble'
            key={idx} to={`/wsp/${wsp.id}`}
            onClick={(e) => setActiveWorkspace(e, wsp)}
          >
            <h1>{wsp.name[0]}</h1>
            <p className='workspace-tooltip'>{wsp.name}</p>
          </Link>
        ))}
      </ul>
      <li className='workspace-bubble'>
        <h1>+</h1>
        <ul className='workspace-tooltip'>
          <Link to='/join-workspace' className='tooltip-option'>Join a workspace</Link>
          <Link to='/create-workspace' className='tooltip-option'>Create a workspace</Link>
        </ul>
      </li>
    </section>
  )
}

export default WorkspaceIndex;