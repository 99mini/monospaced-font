import { useState } from 'react';

import SevenSegment from './components/SevenSegment';

import { NumberOptions, SevenSegmentConsonant } from './types/font-value';

import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState<SevenSegmentConsonant | ''>('');

  const handleNext = () => setValue((prev) => (prev + 1) % 10);
  const handlePrev = () => setValue((prev) => (prev - 1 + 10) % 10);

  return (
    <main>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value as SevenSegmentConsonant | '')}
      />
      <button onClick={() => setText('')}>초기화</button>
      <div>Value: {value}</div>
      <SevenSegment
        value={text || (value as NumberOptions)}
        color="rgba(255, 33, 21, 0.5)"
      />
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </main>
  );
}

export default App;
