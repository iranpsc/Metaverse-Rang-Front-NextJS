declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      poster?: string;

      loading?: "auto" | "lazy" | "eager";

      reveal?: "auto" | "interaction" | "manual";

      "camera-controls"?: boolean;

      "auto-rotate"?: boolean;

      "auto-rotate-delay"?: string;

      "rotation-per-second"?: string;

      "shadow-intensity"?: string;

      exposure?: string;

      "environment-image"?: string;

      "touch-action"?: string;

      ar?: boolean;

      "ar-modes"?: string;

      "interaction-prompt"?: string;

      "camera-orbit"?: string;

      "field-of-view"?: string;

      style?: React.CSSProperties;
    };
  }
}