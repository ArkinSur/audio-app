import React from 'react';

import { render } from '@testing-library/react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { AudioContext } from '@/contexts/AudioContext';

const Provider: React.FC<
  React.PropsWithChildren<{ currentTime: number; duration: number }>
> = ({ currentTime, duration, children }) => (
  <AudioContext.Provider
    value={{
      cues: [],
      activeIndex: 0,
      status: {
        currentTime,
        duration,
        paused: true,
        playing: false,
      } as any,
      onPressPlay: jest.fn(),
      onPressBack: jest.fn(),
      onPressForward: jest.fn(),
    }}
  >
    {children}
  </AudioContext.Provider>
);

describe('ProgressBar', () => {
  it('renders fill width proportional to progress', () => {
    const { getByTestId } = render(
      <Provider currentTime={25} duration={100}>
        <ProgressBar />
      </Provider>,
    );

    const fill = getByTestId('progress-fill');
    const style = (fill.props.style as any[]).find((s: any) => s.width);
    expect(style.width).toBe('25%');
  });

  it('clamps width between 0% and 100%', () => {
    const { getByTestId: get1 } = render(
      <Provider currentTime={-10} duration={100}>
        <ProgressBar />
      </Provider>,
    );
    const style1 = (get1('progress-fill').props.style as any[]).find(
      (s: any) => s.width,
    );
    expect(style1.width).toBe('0%');

    const { getByTestId: get2 } = render(
      <Provider currentTime={150} duration={100}>
        <ProgressBar />
      </Provider>,
    );
    const style2 = (get2('progress-fill').props.style as any[]).find(
      (s: any) => s.width,
    );
    expect(style2.width).toBe('100%');
  });
});
