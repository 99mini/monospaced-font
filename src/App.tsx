import { useState } from 'react';

import SevenSegment from './components/SevenSegment';

import { NumberOptions, SevenSegmentConsonant } from './types/font-value';

import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState<SevenSegmentConsonant | ''>('');

  const [width, setWidth] = useState(4);

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
            <span>{`size(4~100, step: 4): ${width}`}</span>
            <input
              id="size"
              type="range"
              value={width}
              min={4}
              max={100}
              step={4}
              aria-label="size"
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
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div>
          <div
            style={{
              height: 'fit-content',
              width: 'fit-content',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SevenSegment
              thickness={width / 2}
              value={text || (value as NumberOptions)}
              color="rgba(33, 33, 33, 1)"
            />
          </div>
          <div>{'transparency'}</div>
        </div>
        <div>
          <div
            style={{
              height: 'fit-content',
              width: 'fit-content',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SevenSegment
              thickness={width / 2}
              value={text || (value as NumberOptions)}
              color="rgba(33, 33, 33, 1)"
              colorOff="rgba(255, 33, 21, 0.5)"
              isColorOff
            />
          </div>
          <div>{'with colorOff'}</div>
        </div>
      </div>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </main>
  );
}

export default App;
