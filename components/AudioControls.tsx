import { useContext } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AudioContext } from '@/contexts/AudioContext';

export function AudioControls() {
  const { status, activeIndex, onPressPlay, onPressBack, onPressForward } =
    useContext(AudioContext);

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
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
});
