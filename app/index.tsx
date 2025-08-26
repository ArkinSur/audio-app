import { useCallback, useEffect, useMemo, useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Cue,
  findActiveCueIndex,
  TranscriptMeta,
  transcriptToCues,
} from '@/utils';

const audioSource = require('../assets/audio/example_audio.mp3');

const transcription = require('../constants/metadata.json') as TranscriptMeta;

export default function HomeScreen() {
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);
  const [cues, setCues] = useState<Cue[]>([]);

  const insets = useSafeAreaInsets();

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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Audio App</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: '#ededed' }}>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            rowGap: 16,
          }}
        >
          {cues.map((cue, index) => (
            <View key={cue.start} style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: index === activeIndex ? '#dba602' : '#000',
                  },
                ]}
              >
                {cue.speaker}
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  color: index === activeIndex ? '#dba602' : '#000',
                }}
              >
                {cue.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${Math.min(100, Math.max(0, ((status?.currentTime ?? 0) / Math.max(1, status?.duration ?? 1)) * 100))}%`,
            },
          ]}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => onPressBack(activeIndex)}
          style={[styles.playButton, { backgroundColor: '#fff' }]}
        >
          <Ionicons name="play-back" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressPlay} style={styles.playButton}>
          {!status.playing ? (
            <Ionicons name="play" size={28} color="black" />
          ) : (
            <Ionicons name="pause" size={28} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressForward(activeIndex)}
          style={[styles.playButton, { backgroundColor: '#fff' }]}
        >
          <Ionicons name="play-forward" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
  },
  playButton: {
    height: 54,
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
    backgroundColor: '#dba602',
  },
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#dba602',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});
