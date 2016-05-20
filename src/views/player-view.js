import React from 'react';
import {connect} from 'react-redux';

const _PlayerView = (props) => {
  console.log('renditionUrl changed to', props.renditionUrl);

  return (
    <div>
      <video
      src={props.renditionUrl}
      controls
      >
      </video>
    </div>
  );
};

export const PlayerView = connect(
  state => ({
    renditionUrl: state.renditionUrl,
  })
)(_PlayerView);
