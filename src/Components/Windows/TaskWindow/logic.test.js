import {
  calculateSolution,
  generateCapitalTask,
  generateChooseImageTask,
  generateCountryTask,
  generateGreaterLessOrEqualTask,
  generateImageTask,
  generateListeningTask,
  generateLogoTask,
  generateMathTask,
  generateMissedSignTask,
  generateMissedWordTask,
  generateNumberToStringTask,
  generateTranslateTask,
  generateTrueFalseTask,
  getGreaterLessOrEqualSolution,
  validateSolution,
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

describe('generateTranslateTask', () => {
  it('should have right types with toEng lang', () => {
    const task = generateTranslateTask('toEng');
    expect(task.type).toBe('translate');
    const { translate } = task;
    expect(translate).toBeDefined();
    expect(translate.toLang).toBe('toEng');
    expect(translate.word).toBeString();
    expect(translate.solutions).toBeArray();
    expect(translate.solutions[0]).toBeString();
  });

  it('should have right types with toRus lang', () => {
    const task = generateTranslateTask('toRus');
    expect(task.type).toBe('translate');
    const { translate } = task;
    expect(translate).toBeDefined();
    expect(translate.toLang).toBe('toRus');
    expect(translate.word).toBeString();
    expect(translate.solutions).toBeArray();
    expect(translate.solutions[0]).toBeString();
  });
});

describe('generateImageTask', () => {
  it('should have right types', () => {
    const task = generateImageTask();
    expect(task.type).toBe('image');
    const { image } = task;
    expect(image).toBeDefined();
    expect(image.name).toBeString();
    expect(image.solutions).toBeArray();
    expect(image.solutions[0]).toBeString();
  });
});

describe('generateLogoTask', () => {
  it('should have right types', () => {
    const task = generateLogoTask();
    expect(task.type).toBe('logo');
    const { logo } = task;
    expect(logo).toBeDefined();
    expect(logo.name).toBeString();
  });
});

describe('generateCapitalTask', () => {
  it('should have right types', () => {
    const task = generateCapitalTask();
    expect(task.type).toBe('capital');
    const { capital } = task;
    expect(capital).toBeDefined();
    expect(capital.country).toBeString();
    expect(capital.solution).toBeString();
  });
});

describe('generateCountryTask', () => {
  it('should have right types', () => {
    const task = generateCountryTask();
    expect(task.type).toBe('country');
    const { country } = task;
    expect(country).toBeDefined();
    expect(country.capital).toBeString();
    expect(country.solution).toBeString();
  });
});

describe('generateTrueFalseTask', () => {
  it('should have right types', () => {
    const task = generateTrueFalseTask();
    expect(task.type).toBe('trueFalse');
    const { trueFalse } = task;
    expect(trueFalse).toBeDefined();
    expect(trueFalse.question).toBeString();
    expect(trueFalse.solution).toBeString();
  });
});

describe('generateGreaterLessOrEqualTask', () => {
  it('should have right types', () => {
    const task = generateGreaterLessOrEqualTask();
    expect(task.type).toBe('greaterLessOrEqual');
    const { greaterLessOrEqual } = task;
    expect(greaterLessOrEqual).toBeDefined();
    expect(greaterLessOrEqual.operands).toBeArray();
    expect(greaterLessOrEqual.operands[0]).toBeNumber();
    expect(greaterLessOrEqual.solution).toBeString();
  });
});

describe('getGreaterLessOrEqualSolution', () => {
  it('should find greater solution', () => {
    expect(getGreaterLessOrEqualSolution(15, 10)).toBe('>');
  });

  it('should find less solution', () => {
    expect(getGreaterLessOrEqualSolution(10, 15)).toBe('<');
  });

  it('should find equal solution', () => {
    expect(getGreaterLessOrEqualSolution(10, 10)).toBe('=');
  });
});

describe('generateMissedWordTask', () => {
  it('should have right types', () => {
    const task = generateMissedWordTask();
    expect(task.type).toBe('missedWord');
    const { missedWord } = task;
    expect(missedWord).toBeDefined();
    expect(missedWord.parts).toBeArrayOfSize(2);
    expect(missedWord.parts[0]).toBeString();
    expect(missedWord.suggestions).toBeArray();
    expect(missedWord.suggestions[0]).toBeString();
    expect(missedWord.solution).toBeString();
  });
});

describe('generateMissedSignTask', () => {
  it('should have right types', () => {
    const task = generateMissedSignTask();
    expect(task.type).toBe('missedSign');
    const { missedSign } = task;
    expect(missedSign).toBeDefined();
    expect(missedSign.operands).toBeArrayOfSize(2);
    expect(missedSign.operands[0]).toBeNumber();
    expect(missedSign.equals).toBeNumber();
    expect(missedSign.solution).toBeString();
    expect(missedSign.solution).toBeOneOf(['+', '-']);
  });
});

describe('generateNumberToStringTask', () => {
  it('should have right types', () => {
    const task = generateNumberToStringTask();
    expect(task.type).toBe('numberToString');
    const { numberToString } = task;
    expect(numberToString).toBeDefined();
    expect(numberToString.number).toBeNumber();
  });
});

describe('generateChooseImageTask', () => {
  it('should have right types', () => {
    const task = generateChooseImageTask();
    expect(task.type).toBe('chooseImage');
    const { chooseImage } = task;
    expect(chooseImage).toBeDefined();
    expect(chooseImage.object).toBeString();
    expect(chooseImage.suggestions).toBeArray();
    expect(chooseImage.suggestions[0]).toBeString();
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

  it('should validate translate task as true', () => {
    const task = {
      type: 'translate',
      translate: {
        toLang: 'toRus',
        word: 'mouse',
        solutions: ['мышь', 'мышка'],
      },
    };
    expect(validateSolution(task, 'мышь')).toBeTruthy();
    expect(validateSolution(task, 'мышка')).toBeTruthy();
  });

  it('should validate translate task as false', () => {
    const task = {
      type: 'translate',
      translate: {
        toLang: 'toRus',
        word: 'mouse',
        solutions: ['мышь', 'мышка'],
      },
    };
    expect(validateSolution(task, 'дом')).toBeFalsy();
  });

  it('should validate image task as true', () => {
    const task = {
      type: 'image',
      image: {
        name: 'car',
        solutions: ['car', 'auto'],
      },
    };
    expect(validateSolution(task, 'car')).toBeTruthy();
  });

  it('should validate image task as false', () => {
    const task = {
      type: 'image',
      image: {
        name: 'car',
        solutions: ['car', 'auto'],
      },
    };
    expect(validateSolution(task, 'mouse')).toBeFalsy();
  });

  it('should validate logo task as true', () => {
    const task = {
      type: 'logo',
      logo: {
        name: 'bmw',
      },
    };
    expect(validateSolution(task, 'bmw')).toBeTruthy();
  });

  it('should validate logo task as false', () => {
    const task = {
      type: 'logo',
      logo: {
        name: 'logo',
      },
    };
    expect(validateSolution(task, 'apple')).toBeFalsy();
  });

  it('should validate capital task case insensitively as true', () => {
    const task = {
      type: 'capital',
      capital: {
        country: 'Belarus',
        solution: 'Minsk',
      },
    };
    expect(validateSolution(task, 'minsk')).toBeTruthy();
  });

  it('should validate capital task as false', () => {
    const task = {
      type: 'capital',
      capital: {
        country: 'Belarus',
        solution: 'Minsk',
      },
    };
    expect(validateSolution(task, 'Moscow')).toBeFalsy();
  });

  it('should validate country task case insensitively as true', () => {
    const task = {
      type: 'country',
      country: {
        capital: 'Minsk',
        solution: 'Belarus',
      },
    };
    expect(validateSolution(task, 'belarus')).toBeTruthy();
  });

  it('should validate country task as false', () => {
    const task = {
      type: 'country',
      country: {
        capital: 'Minsk',
        solution: 'Belarus',
      },
    };
    expect(validateSolution(task, 'russia')).toBeFalsy();
  });

  it('should validate trueFalse task as true', () => {
    const task = {
      type: 'trueFalse',
      trueFalse: {
        question: 'it is true',
        solution: 'true',
      },
    };
    expect(validateSolution(task, 'true')).toBeTruthy();
  });

  it('should validate trueFalse task as false', () => {
    const task = {
      type: 'trueFalse',
      trueFalse: {
        question: 'it is true',
        solution: 'true',
      },
    };
    expect(validateSolution(task, 'false')).toBeFalsy();
  });

  it('should validate greaterLessOrEqual task as true', () => {
    const task = {
      type: 'greaterLessOrEqual',
      greaterLessOrEqual: {
        operands: [10, 15],
        solution: '<',
      },
    };
    expect(validateSolution(task, '<')).toBeTruthy();
  });

  it('should validate greaterLessOrEqual task as false', () => {
    const task = {
      type: 'greaterLessOrEqual',
      greaterLessOrEqual: {
        operands: [10, 15],
        solution: '<',
      },
    };
    expect(validateSolution(task, '>')).toBeFalsy();
  });

  it('should validate missedWord task as true', () => {
    const task = {
      type: 'missedWord',
      missedWord: {
        parts: ['test', 'of smth'],
        suggestions: ['string', 'number'],
        solution: 'string',
      },
    };
    expect(validateSolution(task, 'string')).toBeTruthy();
  });

  it('should validate missedWord task as false', () => {
    const task = {
      type: 'missedWord',
      missedWord: {
        parts: ['test', 'of smth'],
        suggestions: ['string', 'number'],
        solution: 'string',
      },
    };
    expect(validateSolution(task, 'number')).toBeFalsy();
  });

  it('should validate missedSign task as true', () => {
    const task = {
      type: 'missedSign',
      missedSign: {
        operands: [10, 5],
        equals: 15,
        solution: '+',
      },
    };
    expect(validateSolution(task, '+')).toBeTruthy();
  });

  it('should validate missedSign task as false', () => {
    const task = {
      type: 'missedSign',
      missedSign: {
        operands: [10, 5],
        equals: 15,
        solution: '+',
      },
    };
    expect(validateSolution(task, '-')).toBeFalsy();
  });

  it('should validate numberToString task as true', () => {
    const task = {
      type: 'numberToString',
      numberToString: {
        number: 10,
      },
    };
    expect(validateSolution(task, 'ten')).toBeTruthy();
  });

  it('should validate numberToString task as false', () => {
    const task = {
      type: 'numberToString',
      numberToString: {
        number: 10,
      },
    };
    expect(validateSolution(task, 'eight')).toBeFalsy();
  });

  it('should validate chooseImage task as true', () => {
    const task = {
      type: 'chooseImage',
      chooseImage: {
        object: 'ship',
        suggestions: [
          'ship', 'flower',
        ],
      },
    };
    expect(validateSolution(task, 'ship')).toBeTruthy();
  });

  it('should validate chooseImage task as false', () => {
    const task = {
      type: 'chooseImage',
      chooseImage: {
        object: 'ship',
        suggestions: [
          'ship', 'flower',
        ],
      },
    };
    expect(validateSolution(task, 'flower')).toBeFalsy();
  });
});
