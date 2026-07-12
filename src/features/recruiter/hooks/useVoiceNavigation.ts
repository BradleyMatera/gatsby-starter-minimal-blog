import * as React from "react";
import { type RecruiterSectionId, RECRUITER_SECTIONS } from "./useRecruiterProgress";

type VoiceCommand = {
  phrases: string[];
  action: () => void;
  label: string;
};

const sectionAliases: Record<RecruiterSectionId, string[]> = {
  hero: ["intro", "home", "top"],
  why: ["why", "about", "purpose"],
  roles: ["roles", "positions", "jobs"],
  contributions: ["contributions", "open source", "github"],
  resources: ["resources", "library", "downloads"],
  experience: ["experience", "timeline", "work history"],
  projects: ["projects", "case studies", "portfolio"],
  skills: ["skills", "stack", "technologies"],
  aws: ["aws", "cloud", "amazon"],
  certifications: ["certifications", "certs", "credentials"],
  writing: ["writing", "blog", "articles"],
  faq: ["faq", "questions", "answers"],
  leadership: ["leadership", "military", "army"],
  contact: ["contact", "email", "reach"],
  interview: ["interview", "schedule", "resume"],
};

const scrollTo = (id: RecruiterSectionId) => {
  const el = document.querySelector(`[data-section-id="${id}"]`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const buildCommands = (themeActions: {
  toggleLight: () => void;
  toggleDark: () => void;
  toggleSystem: () => void;
}): VoiceCommand[] => {
  const commands: VoiceCommand[] = [];

  RECRUITER_SECTIONS.forEach(({ id, label }) => {
    commands.push({
      phrases: [label.toLowerCase(), ...sectionAliases[id]],
      action: () => scrollTo(id),
      label: `Go to ${label}`,
    });
  });

  commands.push(
    {
      phrases: ["light mode", "light theme", "light"],
      action: themeActions.toggleLight,
      label: "Switch to light mode",
    },
    {
      phrases: ["dark mode", "dark theme", "dark"],
      action: themeActions.toggleDark,
      label: "Switch to dark mode",
    },
    {
      phrases: ["system mode", "system theme", "system"],
      action: themeActions.toggleSystem,
      label: "Use system theme",
    }
  );

  return commands;
};

export type VoiceState = "idle" | "listening" | "heard" | "error";

export const useVoiceNavigation = (themeActions: {
  toggleLight: () => void;
  toggleDark: () => void;
  toggleSystem: () => void;
}) => {
  const [state, setState] = React.useState<VoiceState>("idle");
  const [lastCommand, setLastCommand] = React.useState<string>("");
  const [supported, setSupported] = React.useState(false);

  const commands = React.useMemo(() => buildCommands(themeActions), [themeActions]);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    setSupported(Boolean(SpeechRecognition));
  }, []);

  const listen = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof window.SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setState("error");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    setState("listening");
    setLastCommand("");

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setLastCommand(transcript);

      const match = commands.find((cmd) => cmd.phrases.some((phrase) => transcript.includes(phrase)));
      if (match) {
        match.action();
        setState("heard");
        setTimeout(() => setState("idle"), 1500);
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    };

    recognition.onerror = () => {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    };

    recognition.onend = () => {
      if (state === "listening") {
        setState("idle");
      }
    };

    recognition.start();
  }, [commands, state]);

  return { state, lastCommand, supported, listen };
};
