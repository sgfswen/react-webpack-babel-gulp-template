import { getVideoSlug } from './libs/videoUtils';
import { saveDscqsScore, saveSsScore } from './libs/db';

const evaluateNextVideo = dispatch => {
  const presentationOrder = Math.random() > 0.5 ? 'REFERENCE_FIRST' : 'TEST_FIRST';
  console.log(presentationOrder);

  dispatch({
    type: 'evaluateNextVideo',
    presentationOrder,
  });
};

const gotoNextPresentationPhase = {
  type: 'gotoNextPresentationPhase',
};

const newSession = {
  type: 'newSession',
};

const submitScore = (score) => (dispatch, getState) => {
  const state = getState();

  const videoSlug = getVideoSlug(state.testVideos[state.idxOfVideoToEvaluate]);

  if (score instanceof Array) {
    const referenceVideoScore = state.presentationOrder === 'REFERENCE_FIRST' ? score[0] : score[1];
    const testVideoScore = state.presentationOrder === 'TEST_FIRST' ? score[0] : score[1];
    saveDscqsScore(videoSlug, state.testerId, referenceVideoScore, testVideoScore);
  } else if (typeof score === 'number') {
    saveSsScore(videoSlug, state.testerId, score);
  }

  dispatch(evaluateNextVideo);
};

export default {
  newSession,
  submitScore,
  evaluateNextVideo,
  gotoNextPresentationPhase,
};
