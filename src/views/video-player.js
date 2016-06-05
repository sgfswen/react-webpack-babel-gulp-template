import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';
import { getVideoFileName, getReferenceVideoFileName } from '../libs/videoUtils';

const _VideoPlayer = React.createClass({
  componentDidMount() {
    this.playVideo();
  },

  componentDidUpdate() {
    this.playVideo();
  },

  playVideo() {
    console.log(`start to play ${this.props.videoLabel}=${this.props.videoFileToPlay}`);

    setTimeout(() => {
      console.log('video ended');
      this.props.dispatch(actions.gotoNextPresentationPhase);
    }, 2 * 1000);
  },

  render() {
    return (
      <div>
        Playing {this.props.videoLabel}
      </div>
    );
  },

});

function decideVideoFileToPlay(state) {
  const testVideo = state.testVideos[state.idxOfVideoToEvaluate];
  const testVideoFileName = getVideoFileName(testVideo);
  const referenceVideoFileName = getReferenceVideoFileName(testVideo);
  const videosToChoose = [referenceVideoFileName, testVideoFileName];

  const idx = state.presentationPhase % 2;
  const adjustedIdx = state.presentationOrder === 'REFERENCE_FIRST' ? idx : (1 - idx);

  return videosToChoose[adjustedIdx];
}

export const VideoPlayer = connect(
  state => ({
    videoLabel: (state.presentationPhase % 2) === 0 ? 'Video 1' : 'Video 2',
    videoFileToPlay: decideVideoFileToPlay(state),
  })
)(_VideoPlayer);
