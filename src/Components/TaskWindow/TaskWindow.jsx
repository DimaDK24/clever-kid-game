import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts/fontello/css/fontello.css';
import './TaskWindow.scss';
import '../utils.scss';
import Button from '../Helpers/Button/Button';
import { convertTaskToStringQuestion, generateMathTask, validateSolution } from './logic';

const INITIAL_WINDOW_CLASS_NAME = 'task__window horizontal-center';
const NOT_ANSWERED = 'not answered';
const SUCCESS = 'success';
const FAIL = 'fail';
const TIME_BEFORE_CLOSE = 1000;
const ESCAPE = 'Escape';

function generateWindowClassName(answerType) {
  if (![SUCCESS, FAIL, NOT_ANSWERED].includes(answerType)) {
    throw new Error(`wrong answerType: ${answerType}`);
  }
  if (answerType === NOT_ANSWERED) {
    return INITIAL_WINDOW_CLASS_NAME;
  }
  return `${INITIAL_WINDOW_CLASS_NAME} ${answerType}`;
}

class TaskWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSolution: '',
      answerType: NOT_ANSWERED,
    };
    this.onFail = () => {
      props.onFail();
      props.onClose();
    };
    this.onSuccess = () => {
      props.onSuccess();
      props.onClose();
    };
    this.onClose = () => props.onClose();
    this.task = generateMathTask();
    this.keyDownCallback = e => this.onKeyDown(e);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownCallback);
  }

  onKeyDown({ code }) {
    if (code === ESCAPE) this.onClose();
  }

  onInputChange(e) {
    this.setState({ userSolution: parseInt(e.target.value, 10) });
  }

  respond(solution) {
    const { userSolution } = this.state;
    if (!userSolution) return;
    const right = validateSolution(this.task, solution);
    if (right) {
      this.setState({ answerType: SUCCESS });
      setTimeout(this.onSuccess, TIME_BEFORE_CLOSE);
    } else {
      this.setState({ answerType: FAIL });
      setTimeout(this.onFail, TIME_BEFORE_CLOSE);
    }
  }

  render() {
    const { answerType, userSolution } = this.state;
    let question;
    if (this.task.type === 'math') {
      question = convertTaskToStringQuestion(this.task);
    }
    const answered = answerType !== NOT_ANSWERED;
    const windowClassName = generateWindowClassName(answerType);
    return (
      <div className={windowClassName}>
        <Button onClick={this.onClose} className="task__window__close">
          <i className="icon-close" />
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.respond(userSolution);
          }}
        >
          <div className="task__window__question">
            <span>
              {question}
              =
            </span>
            <input
              className="task__window__input"
              type="text"
              onChange={e => this.onInputChange(e)}
              disabled={answered}
              autoFocus
            />
          </div>
          <Button className="task__window__send" type="submit">
              Send
          </Button>
        </form>
      </div>
    );
  }
}

TaskWindow.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskWindow;
export {
  validateSolution,
  convertTaskToStringQuestion,
  generateWindowClassName,
  NOT_ANSWERED,
  SUCCESS,
  FAIL,
  INITIAL_WINDOW_CLASS_NAME,
};
