
import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
      // Handle number keys
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      }
      // Handle operator keys
      else if (key === '+') {
        inputOperator('+');
      }
      else if (key === '-') {
        inputOperator('-');
      }
      else if (key === '*') {
        inputOperator('*');
      }
      else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        inputOperator('/');
      }
      // Handle equals and enter
      else if (key === '=' || key === 'Enter') {
        performCalculation();
      }
      // Handle decimal point
      else if (key === '.') {
        inputDecimal();
      }
      // Handle clear/escape
      else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, previousValue, operation, waitingForOperand]);

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
    } else if (operation && !waitingForOperand) {
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
    if (previousValue !== null && operation && !waitingForOperand) {
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
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-80 border border-gray-700">
      <div className="mb-4">
        <div className="bg-gray-900 text-white p-4 rounded text-right text-2xl font-mono min-h-[60px] flex items-center justify-end border border-gray-600">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {/* First Row */}
        <button
          onClick={clear}
          className="col-span-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors border border-red-500"
        >
          Clear
        </button>
        <button
          onClick={() => inputOperator('/')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-500"
        >
          ÷
        </button>
        <button
          onClick={() => inputOperator('*')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-500"
        >
          ×
        </button>

        {/* Second Row */}
        <button
          onClick={() => inputNumber('7')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          7
        </button>
        <button
          onClick={() => inputNumber('8')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          8
        </button>
        <button
          onClick={() => inputNumber('9')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          9
        </button>
        <button
          onClick={() => inputOperator('-')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-500"
        >
          −
        </button>

        {/* Third Row */}
        <button
          onClick={() => inputNumber('4')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          4
        </button>
        <button
          onClick={() => inputNumber('5')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          5
        </button>
        <button
          onClick={() => inputNumber('6')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          6
        </button>
        <button
          onClick={() => inputOperator('+')}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-500"
        >
          +
        </button>

        {/* Fourth Row */}
        <button
          onClick={() => inputNumber('1')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          1
        </button>
        <button
          onClick={() => inputNumber('2')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          2
        </button>
        <button
          onClick={() => inputNumber('3')}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          3
        </button>
        <button
          onClick={performCalculation}
          className="row-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors border border-green-500"
        >
          =
        </button>

        {/* Fifth Row */}
        <button
          onClick={() => inputNumber('0')}
          className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded transition-colors border border-gray-600"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
