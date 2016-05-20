import React from 'react';
import {connect} from 'react-redux';

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

export const RenditionListView = connect(
  state => ({
    renditions: state.renditions,
  }),

  dispatch => ({
    onNewReditionSelected: renditionUrl => dispatch({
      type: 'SET_RENDTION_URL',
      renditionUrl,
    }),
  })
)(_RenditionListView);
