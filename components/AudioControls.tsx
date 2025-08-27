import { useContext } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { AudioContext } from '@/contexts/AudioContext';
import { formatTime } from '@/utils';

export function AudioControls() {
  const { status, activeIndex, onPressPlay, onPressBack, onPressForward } =
    useContext(AudioContext);

  return (
    <View style={styles.container}>
      <ProgressBar />
      <View style={styles.duration}>
        <Text style={styles.durationText}>
          {formatTime(status.currentTime)}
        </Text>
        <Text style={styles.durationText}>{formatTime(status.duration)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => onPressBack(activeIndex)}
          style={styles.button}
        >
          <Ionicons name="play-back" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressPlay}
          style={[styles.button, { backgroundColor: '#dba602' }]}
        >
          {!status.playing ? (
            <Ionicons name="play" size={28} color="black" />
          ) : (
            <Ionicons name="pause" size={28} color="black" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressForward(activeIndex)}
          style={styles.button}
        >
          <Ionicons name="play-forward" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  durationText: {
    fontSize: 12,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 16,
  },
  button: {
    height: 54,
    width: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
  },
});
