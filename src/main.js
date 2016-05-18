import React from 'react';
import {render} from 'react-dom';
import {connect, Provider} from 'react-redux';
import {combineReducers, createStore } from 'redux'

const getRenditionInfoFromMasterM3u8 = (masterM3u8Url) => {
  return [
    {
      url: 'https://example.com/master5000.m3u8'
    },
    {
      url: 'https://example.com/master3000.m3u8'
    },
  ]
}

const _RenditionListView = (props) => {
  let selectEl;

  const createListItem = (rendition) => (
    <option key={rendition.url}>
      {rendition.url}
    </option>
  )

  return (
    <select
      ref={ el => {selectEl = el} }
      onChange={() => props.onNewReditionSelected(selectEl.value) }
    >
      {props.renditions.map(createListItem)}
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
  state => ({
    renditionUrl: state.renditionUrl,
  })
)(_Player);

const stateReducers = combineReducers({
  renditionUrl: (prevState=null, action) => {
    switch (action.type) {
      case 'SET_RENDTION_URL':
        return action.renditionUrl;
      default:
        return prevState;
    }
  },

  masterM3u8Url: (prevState=null, action) => {
    switch (action.type) {
      case 'SET_MASTER_M3U8_URL':
        return action.masterM3u8Url;
      default:
        return prevState;
    }
  },
});

const store = createStore(stateReducers);
store.dispatch({
  type: 'SET_MASTER_M3U8_URL',
  masterM3u8Url: 'https://example.com/master.m3u8',
})

const HlsTestAppView = React.createClass({
  render: () => (
    <Provider store={store}>
      <div>
        <RenditionListView/>
        <Player/>
      </div>
    </Provider>
  ),

})

render(<HlsTestAppView/>, document.getElementById('appHolder'));