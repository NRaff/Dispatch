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
    <section className='workspaces-container'>
      <ul className='workspace-index'>
        {props.workspaces.map((wsp, idx) => (
          <Link
            className='workspace-bubble'
            key={idx} to={`/${wsp.id}`}
            onClick={(e) => setActiveWorkspace(e, wsp)}
          >
            <h1>{wsp.name[0]}</h1>
            <p className='workspace-tooltip'>{wsp.name}</p>
          </Link>
        ))}
      </ul>
      <span className='workspace-bubble'>+</span>
    </section>
  )
}

export default WorkspaceIndex;