import * as React from "react";
import { useStyleLab } from "../../../site/components/StyleLabProvider";
import { useVoiceNavigation } from "../hooks/useVoiceNavigation";

const VoiceNavButton: React.FC = () => {
  const { setCustomMode } = useStyleLab();
  const { state, lastCommand, supported, listen } = useVoiceNavigation({
    toggleLight: () => setCustomMode("light"),
    toggleDark: () => setCustomMode("dark"),
    toggleSystem: () => setCustomMode("system"),
  });

  if (!supported) return null;

  const label =
    state === "listening"
      ? "Listening..."
      : state === "heard"
      ? `Heard: ${lastCommand}`
      : state === "error"
      ? "Didn't catch that"
      : "Voice navigation";

  return (
    <button
      type="button"
      className={`voice-nav-btn ${state === "listening" ? "voice-nav-btn--listening" : ""}`}
      onClick={listen}
      aria-label="Voice navigation"
      title="Voice navigation"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
        <path d="M8 22h8" />
      </svg>
      <span className="voice-nav-btn__label">{label}</span>
    </button>
  );
};

export default VoiceNavButton;
