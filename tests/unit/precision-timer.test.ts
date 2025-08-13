import { PrecisionTimer } from '../../src/backend/core/precision-timer';

describe('PrecisionTimer', () => {
  it('measures time correctly', async () => {
    const timer = new PrecisionTimer();
    timer.start();
    await new Promise(resolve => setTimeout(resolve, 100));
    timer.stop();

    const time = timer.getTime();
    expect(time).toBeGreaterThanOrEqual(100);
    expect(time).toBeLessThan(150);
  });

  it('throws if stopped before started', () => {
    const timer = new PrecisionTimer();
    expect(() => timer.stop()).toThrow("Timer not started!");
  });

  it('throws if time accessed before stopped', () => {
    const timer = new PrecisionTimer();
    timer.start();
    expect(() => timer.getTime()).toThrow("Timer not stopped!");
  });
});