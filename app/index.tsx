import { useContext } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AudioControls } from '@/components/AudioControls';
import { AudioContext } from '@/contexts/AudioContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { cues, activeIndex } = useContext(AudioContext);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Audio App</Text>
      </View>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            rowGap: 16,
          }}
        >
          {cues.map((cue, index) => {
            const activeColor = index === activeIndex ? '#dba602' : '#000';
            return (
              <View
                key={cue.start}
                style={[
                  styles.textContainer,
                  { alignSelf: index % 2 ? 'flex-end' : 'flex-start' },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      color: activeColor,
                    },
                  ]}
                >
                  {cue.speaker}
                </Text>
                <Text
                  style={{
                    color: activeColor,
                  }}
                >
                  {cue.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <AudioControls />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    backgroundColor: '#ededed',
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
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    maxWidth: '80%',
    rowGap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});
