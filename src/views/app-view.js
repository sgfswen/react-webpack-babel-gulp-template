import React from 'react';
import { connect } from 'react-redux';
import { Start } from './start';
import { End } from './end';
import { ScoreCard } from './score-card';
import { VideoPlayer } from './video-player';
import { decidePresentationRepeatTime } from '../libs/videoUtils';

const _AppView = (props) => {
  switch (props.pageToShow) {
    case 'startPage':
      return <Start />;

    case 'endPage':
      return <End />;

    case 'scoreCardPage':
      return <ScoreCard />;

    case 'videoPlayerPage':
      return <VideoPlayer />;

    default:
      return <div>Oops</div>;
  }
};

function decideWhichPageToShow(state) {
  let pageToShow = null;

  if (state.idxOfVideoToEvaluate === -1) {
    pageToShow = 'startPage';
  } else if (state.idxOfVideoToEvaluate >= state.testVideos.length) {
    pageToShow = 'endPage';
  } else {
    const testVideo = state.testVideos[state.idxOfVideoToEvaluate];
    const presentationRepeatTime = decidePresentationRepeatTime(testVideo);
    if (state.presentationPhase >= presentationRepeatTime * 2) {
      pageToShow = 'scoreCardPage';
    } else {
      pageToShow = 'videoPlayerPage';
    }
  }

  return pageToShow;
}

export const AppView = connect(
  state => ({
    pageToShow: decideWhichPageToShow(state),
  })
)(_AppView);
