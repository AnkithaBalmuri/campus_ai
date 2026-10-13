interface Window { SpeechRecognition?: new () => SpeechRecognition; webkitSpeechRecognition?: new () => SpeechRecognition; }
interface SpeechRecognition { lang: string; continuous: boolean; onresult: ((event: SpeechRecognitionEvent) => void) | null; onerror: (() => void) | null; onend: (() => void) | null; start(): void; stop(): void; }
interface SpeechRecognitionEvent { results: ArrayLike<{ 0: { transcript: string } }>; }
