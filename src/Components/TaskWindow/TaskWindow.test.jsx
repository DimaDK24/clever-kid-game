import { shallow } from 'enzyme';
import React from 'react';
import TaskWindow, { convertTaskToStringQuestion, validateSolution } from './TaskWindow';

describe('TaskWindow', () => {
  const emptyFunction = () => ({});
  const task = {
    type: 'math',
    math: {
      operands: [1, 2],
      sign: '+',
      solution: 3,
    },
  };

  it('should render form with input', () => {
    const wrapper = shallow(
      <TaskWindow
        onSuccess={emptyFunction}
        onFail={emptyFunction}
        onClose={emptyFunction}
        task={task}
      />,
    );
    expect(wrapper).toContainMatchingElement('form');
    expect(wrapper).toContainMatchingElement('input');
  });
});

describe('validateSolution', () => {
  it('should compare solution and task.math.solution', () => {
    const task = {
      type: 'math',
      math: {
        solution: 10,
      },
    };
    const response = validateSolution(task, 10);
    expect(response).toBeTruthy();
  });

  it('should throw error for unknown types', () => {
    const task = {
      type: 'unknown type',
      math: {
        solution: 10,
      },
    };
    expect(() => validateSolution(task, 10)).toThrow(/unknown type/);
  });

  it('should return false if solution is wrong', () => {
    const task = {
      type: 'math',
      math: {
        solution: 5,
      },
    };
    const response = validateSolution(task, 10);
    expect(response).toBeFalsy();
  });
});

describe('convertTaskToStringQuestion', () => {
  it('should convert math task 1', () => {
    const task = {
      type: 'math',
      math: {
        operands: [1, 2],
        sign: '+',
      },
    };
    const questionString = '1+2';
    expect(convertTaskToStringQuestion(task)).toBe(questionString);
  });

  it('should convert math task 2', () => {
    const task = {
      type: 'math',
      math: {
        operands: [52, 90],
        sign: '*',
      },
    };
    const questionString = '52*90';
    expect(convertTaskToStringQuestion(task)).toBe(questionString);
  });

  it('should throw error if task type is unknown', () => {
    const task = {
      type: 'unknown',
    };
    expect(() => convertTaskToStringQuestion(task)).toThrow(/unknown/);
  });
});