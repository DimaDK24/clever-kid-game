import {
  calculateSolution, generateListeningTask, generateMathTask, validateSolution,
} from './logic';

describe('generateMathTask', () => {
  it('should have right types', () => {
    const task = generateMathTask();
    expect(task.type).toBe('math');
    const { math } = task;
    expect(math).toBeDefined();
    expect(math.operands).toBeArrayOfSize(2);
    expect(math.operands[0]).toBeNumber();
    expect(math.operands[1]).toBeNumber();
    expect(math.sign).toBeString();
    expect(math.sign).toBeOneOf(['+', '-']);
    expect(math.solution).toBeNumber();
  });
});

describe('generateListeningTask', () => {
  it('should have right types', () => {
    const task = generateListeningTask();
    expect(task.type).toBe('listening');
    const { listening } = task;
    expect(listening).toBeDefined();
    expect(listening.name).toBeString();
    expect(listening.solution).toBeString();
  });
});

describe('calculateSolution', () => {
  const PLUS = '+';
  const MINUS = '-';

  it('should calculate small addition', () => {
    const operands = [10, 5];
    const actual = calculateSolution({ operands, sign: PLUS });
    expect(actual).toBe(15);
  });

  it('should calculate big addition', () => {
    const operands = [99, 98];
    const actual = calculateSolution({ operands, sign: PLUS });
    expect(actual).toBe(197);
  });

  it('should calculate simple subtraction', () => {
    const operands = [10, 5];
    const actual = calculateSolution({ operands, sign: MINUS });
    expect(actual).toBe(5);
  });

  it('should calculate subtraction with negative sign', () => {
    const operands = [5, 15];
    const actual = calculateSolution({ operands, sign: MINUS });
    expect(actual).toBe(-10);
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
    const response = validateSolution(task, '10');
    expect(response).toBeTruthy();
  });

  it('should throw error for unknown types', () => {
    const task = {
      type: 'unknown type',
      math: {
        solution: 10,
      },
    };
    expect(() => validateSolution(task, '10')).toThrow(/unknown type/);
  });

  it('should return false if solution is wrong', () => {
    const task = {
      type: 'math',
      math: {
        solution: 5,
      },
    };
    const response = validateSolution(task, '10');
    expect(response).toBeFalsy();
  });

  it('should validate listening task as true', () => {
    const task = {
      type: 'listening',
      listening: {
        name: 'hello',
        solution: 'hello',
      },
    };
    const response = validateSolution(task, 'hello');
    expect(response).toBeTruthy();
  });

  it('should validate listening task as false', () => {
    const task = {
      type: 'listening',
      listening: {
        name: 'hello',
        solution: 'hello',
      },
    };
    const response = validateSolution(task, 'star');
    expect(response).toBeFalsy();
  });
});
