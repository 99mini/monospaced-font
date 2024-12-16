import { useState } from 'react';

import SevenSegment from './components/SevenSegment';

import { NumberOptions, SevenSegmentConsonant } from './types/font-value';

import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState<SevenSegmentConsonant | ''>('');

  const [width, setWidth] = useState(100);

  const handleNext = () => setValue((prev) => (prev + 1) % 10);
  const handlePrev = () => setValue((prev) => (prev - 1 + 10) % 10);

  return (
    <main>
      <div>
        <h1>control</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <label>
            <span>{`Width(10~100, step: 10): ${width}`}</span>
            <input
              id="width"
              type="range"
              value={width}
              min={20}
              max={100}
              step={10}
              aria-label="width"
              onChange={(e) => setWidth(+e.target.value)}
            />
          </label>
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) =>
                setText(e.target.value as SevenSegmentConsonant | '')
              }
            />
            <button onClick={() => setText('')}>초기화</button>
          </div>
        </div>
      </div>

      <div>Value: {value}</div>
      <div
        style={{
          height: 'fit-content',
          width: 'fit-content',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px dashed rgba(0, 0, 0, 0.5)',
        }}
      >
        <SevenSegment
          width={width}
          value={text || (value as NumberOptions)}
          color="rgba(255, 33, 21, 0.5)"
        />
      </div>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </main>
  );
}

export default App;
