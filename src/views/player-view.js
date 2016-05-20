import React from 'react';
import {connect} from 'react-redux';

const _PlayerView = (props) => {
  console.log('renditionUrl changed to', props.renditionUrl);

  return (
    <div>
      <video data-account="4468173393001"
      data-player="c8b1e2c3-c5b0-48ec-9675-75b5d76db355"
      data-embed="default"
      class="video-js"
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
