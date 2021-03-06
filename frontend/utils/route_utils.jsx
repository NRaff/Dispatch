import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  withRouter
} from 'react-router-dom'

const mSTP = state => ({
  loggedIn: Boolean(state.session.userId),
  selectedWorkspace: Boolean(state.ui.activeWorkspaceId)
})

const Auth = ({loggedIn, path, component: Component}) => (
  <Route 
    path={path}
    render={props => (
      loggedIn ? <Redirect to="/" /> : <Component {...props} />
    )}
  />
);

const Protected = ({loggedIn, path, component: Component}) => (
  <Route
    path={path}
    render={ props => (
      loggedIn ? <Component {...props} /> : <Redirect to="/signup"/>
    )}
  />
)

const Workspace = ({loggedIn, selectedWorkspace, path, component: Component}) => (
  <Route
    path={path}
    render={props => (
      loggedIn && selectedWorkspace ? <Component {...props} /> : <Redirect to="/" />
    )}
  />
)

const Hidden = ({selectedWorkspace, path, component: Component}) => (
  <Route
    path={path}
    render={props => (
      selectedWorkspace ? <Component {...props} /> : null
    )}
  />
)

export const AuthRoute = withRouter(connect(mSTP, null)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP, null)(Protected));
export const ProtectedWorkspace = withRouter(connect(mSTP, null)(Workspace))
export const HiddenWorkspace = withRouter(connect(mSTP, null)(Hidden))