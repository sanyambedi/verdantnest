
'use client';

type ErrorEventListener = (error: any) => void;

class ErrorEmitter {
  private listeners: { [channel: string]: ErrorEventListener[] } = {};

  on(channel: string, listener: ErrorEventListener) {
    if (!this.listeners[channel]) {
      this.listeners[channel] = [];
    }
    this.listeners[channel].push(listener);
    return () => this.off(channel, listener);
  }

  off(channel: string, listener: ErrorEventListener) {
    if (!this.listeners[channel]) return;
    this.listeners[channel] = this.listeners[channel].filter(l => l !== listener);
  }

  emit(channel: string, error: any) {
    if (!this.listeners[channel]) return;
    this.listeners[channel].forEach(listener => listener(error));
  }
}

export const errorEmitter = new ErrorEmitter();
