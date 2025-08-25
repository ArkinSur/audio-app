import { useCallback } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

const audioSource = require('../assets/audio/example_audio.mp3');

export default function HomeScreen() {
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  const insets = useSafeAreaInsets();

  const onPressPlay = useCallback(() => {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }, [player]);

  const onPressBack = useCallback(() => {
    player.pause();
    player.seekTo(0);
  }, [player]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View
        style={{ flex: 1, backgroundColor: '#ededed', paddingHorizontal: 16 }}
      />
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
          onPress={onPressBack}
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
    backgroundColor: '#ffd91a',
  },
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffd91a',
  },
});
