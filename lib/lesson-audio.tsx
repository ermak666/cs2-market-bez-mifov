import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import * as Speech from "expo-speech";

type PlaybackState = "stopped" | "playing" | "paused";

type LessonAudioValue = {
  activeLessonId: string | null;
  playbackState: PlaybackState;
  position: number;
  duration: number;
  playbackRate: number;
  canPause: boolean;
  playLesson: (lessonId: string, text: string) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setPlaybackRate: (rate: number) => void;
  seekBy: (seconds: number) => void;
};

const LessonAudioContext = createContext<LessonAudioValue | null>(null);
const PLAYBACK_ERROR_MESSAGE = "Не удалось запустить озвучивание. Проверьте громкость медиа и наличие русского голосового движка на устройстве.";

export function LessonAudioProvider({ children }: { children: React.ReactNode }) {
  const operationRef = useRef(0);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("stopped");
  const [playbackRate, setPlaybackRateState] = useState(1);

  const stop = useCallback(() => {
    operationRef.current += 1;
    void Speech.stop().catch((error) => console.warn("[lesson-audio] Stop failed", error));
    setActiveLessonId(null);
    setPlaybackState("stopped");
  }, []);

  useEffect(() => () => {
    operationRef.current += 1;
    void Speech.stop();
  }, []);

  const playLesson = useCallback(async (lessonId: string, text: string) => {
    const normalizedText = text.replace(/\s+/g, " ").trim();
    if (!normalizedText) {
      Alert.alert("Озвучка недоступна", "В этом уроке пока нет текста для озвучивания.");
      return;
    }

    const operation = operationRef.current + 1;
    operationRef.current = operation;
    await Speech.stop();
    if (operationRef.current !== operation) return;

    setActiveLessonId(lessonId);
    setPlaybackState("playing");
    Speech.speak(normalizedText, {
      language: "ru-RU",
      rate: playbackRate,
      pitch: 1,
      volume: 1,
      onDone: () => {
        if (operationRef.current === operation) {
          setActiveLessonId(null);
          setPlaybackState("stopped");
        }
      },
      onStopped: () => {
        if (operationRef.current === operation) {
          setActiveLessonId(null);
          setPlaybackState("stopped");
        }
      },
      onError: (error) => {
        console.warn("[lesson-audio] Speech failed", error);
        if (operationRef.current === operation) {
          setActiveLessonId(null);
          setPlaybackState("stopped");
          Alert.alert("Озвучка недоступна", PLAYBACK_ERROR_MESSAGE);
        }
      },
    });
  }, [playbackRate]);

  const pause = useCallback(() => {
    // Expo Speech does not support pause/resume on Android. The control is hidden there.
  }, []);

  const resume = useCallback(() => {
    // Expo Speech does not support pause/resume on Android. The control is hidden there.
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    setPlaybackRateState([0.8, 1, 1.2].includes(rate) ? rate : 1);
  }, []);

  const seekBy = useCallback((_seconds: number) => {
    // Text-to-speech does not expose reliable seeking on Android.
  }, []);

  const value = useMemo(() => ({
    activeLessonId,
    playbackState,
    position: 0,
    duration: 0,
    playbackRate,
    canPause: false,
    playLesson,
    pause,
    resume,
    stop,
    setPlaybackRate,
    seekBy,
  }), [activeLessonId, pause, playbackRate, playbackState, playLesson, resume, seekBy, setPlaybackRate, stop]);

  return <LessonAudioContext.Provider value={value}>{children}</LessonAudioContext.Provider>;
}

export function useLessonAudio() {
  const value = useContext(LessonAudioContext);
  if (value) return value;
  return {
    activeLessonId: null,
    playbackState: "stopped" as PlaybackState,
    position: 0,
    duration: 0,
    playbackRate: 1,
    canPause: false,
    playLesson: async () => {},
    pause: () => {},
    resume: () => {},
    stop: () => {},
    setPlaybackRate: () => {},
    seekBy: () => {},
  };
}
