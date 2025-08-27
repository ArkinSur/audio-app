import {
  Cue,
  findActiveCueIndex,
  formatTime,
  TranscriptMeta,
  transcriptToCues,
} from '@/utils';

describe('formatTime', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(5)).toBe('00:05');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(600)).toBe('10:00');
  });
});

describe('transcriptToCues', () => {
  const sample: TranscriptMeta = {
    pause: 500,
    speakers: [
      {
        name: 'A',
        phrases: [
          { words: 'Hello', time: 1000 },
          { words: 'Again', time: 1000 },
        ],
      },
      {
        name: 'B',
        phrases: [{ words: 'World', time: 1000 }],
      },
    ],
  };

  it('builds interleaved cues with correct timings', () => {
    let cues: Cue[] = [];
    const setCues = (v: Cue[] | ((prev: Cue[]) => Cue[])) => {
      cues = typeof v === 'function' ? v(cues) : v;
    };
    transcriptToCues(sample)(setCues);

    expect(cues).toHaveLength(3);
    expect(cues[0]).toMatchObject({
      text: 'Hello',
      speaker: 'A',
      start: 0,
      end: 1,
    });
    expect(cues[1].start).toBeCloseTo(1.5, 3);
    expect(cues[1].end).toBeCloseTo(2.5, 3);
    expect(cues[2].start).toBeCloseTo(3.0, 3);
  });

  it('computes correct end time for the last cue', () => {
    let cues: Cue[] = [];
    const setCues = (v: Cue[] | ((prev: Cue[]) => Cue[])) => {
      cues = typeof v === 'function' ? v(cues) : v;
    };
    transcriptToCues(sample)(setCues);
    expect(cues[cues.length - 1].end).toBeCloseTo(4.0, 3);
  });
});

describe('findActiveCueIndex', () => {
  const cues: Cue[] = [
    { start: 0, end: 1, text: 'a', speaker: 'A' },
    { start: 1.5, end: 2.5, text: 'b', speaker: 'B' },
    { start: 3.0, end: 4.0, text: 'c', speaker: 'A' },
  ];

  it('returns correct index when inside a cue', () => {
    expect(findActiveCueIndex(cues, 0.2)).toBe(0);
    expect(findActiveCueIndex(cues, 2.0)).toBe(1);
    expect(findActiveCueIndex(cues, 3.5)).toBe(2);
  });

  it('clamps to closest index when between cues or out of bounds', () => {
    expect(findActiveCueIndex(cues, -1)).toBe(0);
    expect(findActiveCueIndex(cues, 1.2)).toBe(1);
    expect(findActiveCueIndex(cues, 10)).toBe(2);
  });
});
