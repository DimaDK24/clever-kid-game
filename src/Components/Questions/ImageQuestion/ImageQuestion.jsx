import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Helpers/Loader/Loader';
import QuestionWithTextAnswer from '../BaseQuestions/QuestionWithTextAnswer/QuestionWithTextAnswer';


class ImageQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
    };
  }

  async componentDidMount() {
    const { name } = this.props;
    const { default: imageSource } = await import(`./images/${name}.jpg`);
    this.setState({ imageSource });
  }

  render() {
    const { name, ...baseComponentProps } = this.props;
    const { imageSource } = this.state;
    let question;
    if (imageSource) {
      question = (<img src={imageSource} alt={name} height="120" />);
    } else question = <Loader />;
    return (
      <QuestionWithTextAnswer
        hint="What is on the image:"
        question={question}
        {...baseComponentProps}
      />
    );
  }
}

ImageQuestion.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ImageQuestion;