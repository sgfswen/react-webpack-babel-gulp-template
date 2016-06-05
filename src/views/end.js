import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

const _End = (props) => (
  <div>
    This is the end of the test session. Thanks for your particiatpion.
    <div>
      <button onClick={() => props.dispatch(actions.newSession)}>New session</button>
    </div>
  </div>
);


export const End = connect(
  state => ({})
)(_End);
