import { useContext } from 'react';

import { StyleSheet, View } from 'react-native';

import { AudioContext } from '@/contexts/AudioContext';

export function ProgressBar() {
  const { status } = useContext(AudioContext);

  return (
    <View style={styles.progressBarBg}>
      <View
        testID="progress-fill"
        style={[
          styles.progressBarFill,
          {
            width: `${Math.min(100, Math.max(0, ((status?.currentTime ?? 0) / Math.max(1, status?.duration ?? 1)) * 100))}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#e7e8f8',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#dba602',
  },
});
