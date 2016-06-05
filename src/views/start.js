import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

const _Start = (props) => (
  <div>
    Hi, Welcome to the test session. Click the start button when you are ready.
    <div>
      <button onClick={() => props.dispatch(actions.evaluateNextVideo)}>Start</button>
    </div>
  </div>
);


export const Start = connect(
  state => ({})
)(_Start);
