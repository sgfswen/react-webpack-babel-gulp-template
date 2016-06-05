export default function masterReducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'newSession':
      nextState = Object.assign({}, state, {
        idxOfVideoToEvaluate: -1,
        testerId: Math.random().toString(36).substring(7),
      });
      break;

    case 'gotoNextPresentationPhase':
      nextState = Object.assign({}, state, {
        presentationPhase: state.presentationPhase + 1,
      });
      break;

    case 'evaluateNextVideo':
      nextState = Object.assign({}, state, {
        idxOfVideoToEvaluate: state.idxOfVideoToEvaluate + 1,
        presentationOrder: action.presentationOrder,
        presentationPhase: 0,
      });
      break;

    default:
      nextState = state;
      break;
  }

  return nextState;
}
