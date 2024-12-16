export type NumberOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

export type SevenSegmentConsonant =
  | 'ㄱ'
  | 'ㄴ'
  | 'ㄷ'
  | 'ㄹ'
  | 'ㅁ'
  | 'ㅂ'
  | 'ㅋ'
  | 'ㅌ';

export type SingleConsonant =
  | SevenSegmentConsonant
  | 'ㅅ'
  | 'ㅇ'
  | 'ㅈ'
  | 'ㅊ'
  | 'ㅍ'
  | 'ㅎ';

export type SevenSegmentDoubleConsonant = 'ㄲ' | 'ㄸ' | 'ㅃ';

export type DoubleConsonant = SevenSegmentDoubleConsonant | 'ㅆ' | 'ㅉ';

export type CompoundConsonant =
  | 'ㄳ'
  | 'ㄵ'
  | 'ㄶ'
  | 'ㄺ'
  | 'ㄻ'
  | 'ㄼ'
  | 'ㄽ'
  | 'ㄾ'
  | 'ㄿ'
  | 'ㅀ'
  | 'ㅄ';

export type Consonant = SingleConsonant | DoubleConsonant | CompoundConsonant;

export type SingleVowel =
  | 'ㅏ'
  | 'ㅑ'
  | 'ㅓ'
  | 'ㅕ'
  | 'ㅗ'
  | 'ㅛ'
  | 'ㅜ'
  | 'ㅠ'
  | 'ㅡ'
  | 'ㅣ';

export type DoubleVowel =
  | 'ㅐ'
  | 'ㅔ'
  | 'ㅖ'
  | 'ㅘ'
  | 'ㅙ'
  | 'ㅚ'
  | 'ㅝ'
  | 'ㅞ'
  | 'ㅟ'
  | 'ㅢ';
export type CompoundVowel = 'ㅘ' | 'ㅙ' | 'ㅚ' | 'ㅝ' | 'ㅞ' | 'ㅟ' | 'ㅢ';

export type Vowel = SingleVowel | DoubleVowel | CompoundVowel;

export type SevenSegmentOptions = NumberOptions | SevenSegmentConsonant;
