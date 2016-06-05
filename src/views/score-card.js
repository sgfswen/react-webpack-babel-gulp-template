import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

const _ScoreCard = React.createClass({
  getInitialState() {
    return {
      scores: [50, 50],
      timeRemaningInSeconds: 10,
    };
  },

  componentDidMount() {
    const countDownTask = () => {
      if (this.state.timeRemaningInSeconds <= 0) {
//        this.submit();
      } else {
        const newState = Object.assign({}, this.state, {
          timeRemaningInSeconds: this.state.timeRemaningInSeconds - 1,
        });
        this.setState(newState);
      }
    };

    this.countDownTimer = setInterval(countDownTask, 1 * 1000);
  },

  componentWillUnmount() {
    clearInterval(this.countDownTimer);
  },

  handleChange(event) {
    const idx = parseInt(event.target.getAttribute('data-idx'), 10);
    const newScores = this.state.scores.slice();
    newScores[idx] = event.target.value;

    this.setState(Object.assign({}, this.state, {
      scores: newScores,
    }));
  },

  submit() {
    const score = this.state.scores;
    this.props.submitScore(score);
  },

  render() {
    const timeIndicator = this.state.timeRemaningInSeconds <= 5
      ? `Please complete scoring in ${this.state.timeRemaningInSeconds} seconds`
      : '';

    const createSlider = (idx) => (
      <span>
        <input
          data-idx={idx}
          type="range"
          min="0"
          max="100"
          value={this.state.scores[idx]}
          onChange={this.handleChange}
        >
        </input>
        <span>{this.state.scores[idx]}</span>
      </span>
    );

    return (
      <div>
        <div>
          <label>Score for video 1</label>
          {createSlider(0)}
        </div>
        <div>
          <label>Score for video 2</label>
          {createSlider(1)}
        </div>
        <div>
          <button onClick={this.submit}>Submit</button>
        </div>
        <div>
          {timeIndicator}
        </div>

      </div>
    );
  },
});


export const ScoreCard = connect(
  state => ({ // eslint-disable-line no-unused-vars
  }),

  dispatch => ({
    submitScore: score => dispatch(actions.submitScore(score)),
  })
)(_ScoreCard);
