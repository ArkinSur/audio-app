import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AudioStatus, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import {
  Cue,
  findActiveCueIndex,
  TranscriptMeta,
  transcriptToCues,
} from '@/utils';

import audioSource from '../assets/audio/example_audio.mp3';

const transcription = require('../constants/metadata.json') as TranscriptMeta;

interface AudioContextType {
  cues: Cue[];
  activeIndex: number;
  status: AudioStatus;
  onPressPlay: () => void;
  onPressBack: (index: number) => void;
  onPressForward: (index: number) => void;
}

export const AudioContext = createContext<AudioContextType>(
  {} as AudioContextType,
);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [cues, setCues] = useState<Cue[]>([]);

  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const onPressPlay = useCallback(() => {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }, [player]);

  const onPressBack = useCallback(
    (index: number) => {
      const currentCue = cues[index];
      const previousCue = index === 0 ? currentCue : cues[index - 1];

      if (status.currentTime <= currentCue.start) {
        player.seekTo(previousCue.start);
      } else {
        player.seekTo(currentCue.start);
      }
    },
    [player, cues, status.currentTime],
  );

  const onPressForward = useCallback(
    (index: number) => {
      const maxLength = cues.length;

      if (index + 1 !== maxLength) {
        player.seekTo(cues[index + 1].start);
      }
    },
    [cues, player],
  );

  const activeIndex = useMemo(
    () => findActiveCueIndex(cues, status?.currentTime ?? 0),
    [cues, status?.currentTime],
  );

  useEffect(() => {
    transcriptToCues(transcription)(setCues);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        cues,
        activeIndex,
        status,
        onPressPlay,
        onPressBack,
        onPressForward,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
