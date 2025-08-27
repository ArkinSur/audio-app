import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { AudioControls } from '@/components/AudioControls';
import { AudioContext } from '@/contexts/AudioContext';

const setup = (overrides?: Partial<React.ContextType<typeof AudioContext>>) => {
  const value: any = {
    cues: [],
    activeIndex: 0,
    status: { currentTime: 0, duration: 120, playing: false, paused: true },
    onPressPlay: jest.fn(),
    onPressBack: jest.fn(),
    onPressForward: jest.fn(),
    ...overrides,
  };

  const utils = render(
    <AudioContext.Provider value={value}>
      <AudioControls />
    </AudioContext.Provider>,
  );
  return { ...utils, value };
};

describe('AudioControls', () => {
  it('renders play when not playing, pause when playing', () => {
    const { getByText, rerender } = setup({
      status: {
        currentTime: 0,
        duration: 1,
        playing: false,
        paused: true,
      } as any,
    });
    expect(getByText('icon:play')).toBeTruthy();

    const next = (
      <AudioContext.Provider
        value={{
          cues: [],
          activeIndex: 0,
          status: {
            currentTime: 0,
            duration: 1,
            playing: true,
            paused: false,
          } as any,
          onPressPlay: jest.fn(),
          onPressBack: jest.fn(),
          onPressForward: jest.fn(),
        }}
      >
        <AudioControls />
      </AudioContext.Provider>
    );
    rerender(next);
    expect(getByText('icon:pause')).toBeTruthy();
  });

  it('invokes callbacks for back/play/forward', () => {
    const { getByText, value } = setup();

    fireEvent.press(getByText('icon:play-back'));
    fireEvent.press(getByText('icon:play'));
    fireEvent.press(getByText('icon:play-forward'));

    expect(value.onPressBack).toHaveBeenCalledWith(0);
    expect(value.onPressPlay).toHaveBeenCalled();
    expect(value.onPressForward).toHaveBeenCalledWith(0);
  });
});
