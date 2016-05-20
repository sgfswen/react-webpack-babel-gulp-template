import React from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

const _MasterM3u8UrlView = React.createClass({
  getInitialState: function() {
    return {value: this.props.masterM3u8Url};
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  onBtnClick: function(){
    this.props.loadNewUrl(this.state.value);
  },

  render: function(){
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
        <button onClick={this.onBtnClick}>Load</button>
      </div>
    );
  },
});


export const MasterM3u8UrlView = connect(
  state => ({
    masterM3u8Url: state.masterM3u8Url,
  }),

  dispatch =>({
    loadNewUrl: newUrl => dispatch(actions.updateMasterM3u8UrlToStore(newUrl)),
  })

)(_MasterM3u8UrlView);
