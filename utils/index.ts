import { Dispatch, SetStateAction } from 'react';

export type TranscriptMeta = {
  pause: number; // milliseconds
  speakers: {
    name: string;
    phrases: {
      words: string;
      time: number; // milliseconds
    }[];
  }[];
};

export type Cue = {
  start: number; // seconds
  end: number; // seconds
  text: string;
  speaker: string;
};

export const transcriptToCues =
  (data: TranscriptMeta, includePauseAfterLast = true) =>
  (setState: Dispatch<SetStateAction<Cue[]>>) => {
    const cues: Cue[] = [];

    // Build interleaved sequence of {speakerIndex, phraseIndex}
    const maxLen = Math.max(...data.speakers.map((s) => s.phrases.length));
    const sequence: { speaker: string; words: string; time: number }[] = [];
    for (let p = 0; p < maxLen; p++) {
      for (const sp of data.speakers) {
        if (sp.phrases[p]) {
          sequence.push({
            speaker: sp.name,
            words: sp.phrases[p].words,
            time: sp.phrases[p].time,
          });
        }
      }
    }

    let tMs = 0; // running clock in ms
    const lastIdx = sequence.length - 1;

    sequence.forEach((item, idx) => {
      const start = tMs / 1000;
      const end = (tMs + item.time) / 1000;
      cues.push({ start, end, text: item.words, speaker: item.speaker });

      // advance by spoken time
      tMs += item.time;

      // add pause after phrase (optionally after the very last one)
      if (idx !== lastIdx || includePauseAfterLast) {
        tMs += data.pause;
      }
    });

    setState(cues);
  };

export const findActiveCueIndex = (cues: Cue[], positionSec: number) => {
  // Binary search to find the closest cue index to the given position
  let lo = 0;
  let hi = cues.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const cue = cues[mid];

    const isBefore = positionSec < cue.start;
    const isAfter = positionSec > cue.end;

    if (isBefore) {
      hi = mid - 1;
    } else if (isAfter) {
      lo = mid + 1;
    } else {
      // positionSec is within this cue
      return mid;
    }
  }

  // If no exact match, return the closest valid index
  const closest = lo;
  return Math.max(0, Math.min(closest, cues.length - 1));
};

// Format time in minutes:seconds
export const formatTime = (time: number) => {
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
};
