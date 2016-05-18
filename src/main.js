import React from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {combineReducers, createStore } from 'redux'

const _RenditionListView = (props) => {
  let selectEl;

  const createListItem = (rendition) => (
    <option>
      {rendition.url}
    </option>
  )

  return (
    <select
      ref={ el => {selectEl = el} }
      onChange={() => props.onNewReditionSelected(selectEl.value) }
    >
      {this.props.renditions.map(createListItem)}
    </select>
  );
};

const RenditionListView = connect(
  state => ({
    renditions: getRenditionInfoFromMasterM3u8(state.masterM3u8Url),
  }),

  dispatch => ({
    onNewReditionSelected: renditionUrl => dispatch({
      type: 'SET_RENDTION_URL',
      renditionUrl,
    }),
  })
)(_RenditionListView);

const _Player = (props) => {
  console.log('renditionUrl changed to', props.renditionUrl);

  return (
    <video data-account="4468173393001"
    data-player="c8b1e2c3-c5b0-48ec-9675-75b5d76db355"
    data-embed="default"
    class="video-js"
    src={props.renditionUrl}
    controls
    >
    </video>
  );
}

const Player = connect(
  (state) => {
    renditionUrl: state.renditionUrl,
  }
)(_Player);

const stateReducers = combineReducers({
  renditionUrl: (prevState, action) => {
    switch (action.type) {
      case 'SET_RENDTION_URL':
        return action.renditionUrl;
      default:
        return prevState;
    }
  }
});

const store = createStore(stateReducers);

const HlsTestAppView = React.createClass({
  render: () => (
    <Provider store={store}>
      <RenditionListView/>
      <Player/>
    </Provider>
  ),

})