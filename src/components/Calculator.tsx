
import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 w-80">
      <div className="mb-4">
        <div className="bg-gray-900 text-white p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {/* First Row */}
        <button
          onClick={clear}
          className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => inputOperator('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          ÷
        </button>
        <button
          onClick={() => inputOperator('*')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          ×
        </button>

        {/* Second Row */}
        <button
          onClick={() => inputNumber('7')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          7
        </button>
        <button
          onClick={() => inputNumber('8')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          8
        </button>
        <button
          onClick={() => inputNumber('9')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          9
        </button>
        <button
          onClick={() => inputOperator('-')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          −
        </button>

        {/* Third Row */}
        <button
          onClick={() => inputNumber('4')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          4
        </button>
        <button
          onClick={() => inputNumber('5')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          5
        </button>
        <button
          onClick={() => inputNumber('6')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          6
        </button>
        <button
          onClick={() => inputOperator('+')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          +
        </button>

        {/* Fourth Row */}
        <button
          onClick={() => inputNumber('1')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          1
        </button>
        <button
          onClick={() => inputNumber('2')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          2
        </button>
        <button
          onClick={() => inputNumber('3')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          3
        </button>
        <button
          onClick={performCalculation}
          className="row-span-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          =
        </button>

        {/* Fifth Row */}
        <button
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition-colors"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
