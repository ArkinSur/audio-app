/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-native/extend-expect';

jest.mock('expo-audio', () => {
  const playMock = jest.fn();
  const pauseMock = jest.fn();
  const seekToMock = jest.fn();
  const getStatusMock = () => ({
    currentTime: 0,
    duration: 0,
    playing: false,
    paused: true,
  });

  return {
    useAudioPlayer: () => ({
      play: playMock,
      pause: pauseMock,
      seekTo: seekToMock,
      paused: true,
    }),
    useAudioPlayerStatus: () => getStatusMock(),
    __mocks__: { playMock, pauseMock, seekToMock },
  };
});

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function Ionicons(props: any) {
    return React.createElement(Text, null, `icon:${props.name}`);
  };
});
