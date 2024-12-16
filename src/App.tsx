import { useState } from 'react';

import SevenSegment from './components/SevenSegment';

import { NumberOptions, SevenSegmentConsonant } from './types/font-value';

import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState<SevenSegmentConsonant | undefined>(
    undefined
  );

  const [size, setSize] = useState(8);

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
            <span>{`size(8~100, step: 4): ${size}`}</span>
            <input
              id="size"
              type="range"
              value={size}
              min={8}
              max={100}
              step={4}
              aria-label="size"
              onChange={(e) => setSize(+e.target.value)}
            />
          </label>
          <div>
            <select
              value={text}
              onChange={(e) => {
                if (e.target.value === '초기화') {
                  setText(undefined);
                  return;
                }
                setText(e.target.value as SevenSegmentConsonant);
              }}
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #333',
                width: '100%',
              }}
            >
              {['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅋ', 'ㅌ', '초기화'].map(
                (v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                )
              )}
            </select>
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
              size={size}
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
              size={size}
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
