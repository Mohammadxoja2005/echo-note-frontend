
/// <reference types="vite/client" />

interface URL {
  createObjectURL(object: any): string;
  revokeObjectURL(url: string): void;
}

interface Window {
  webkitAudioContext: typeof AudioContext;
}
