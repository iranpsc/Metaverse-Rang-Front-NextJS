const SVG_INVALID_DOM_PROPERTIES = new Set([
  "fill-rule",
  "clip-rule",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
  "stop-color",
  "stroke-miterlimit",
]);

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const originalConsoleError = console.error;

  console.error = (...args: unknown[]) => {
    const message = args.map((arg) => String(arg)).join(" ");

    const isKnownSvgPropertyWarning =
      message.includes("Invalid DOM property") &&
      [...SVG_INVALID_DOM_PROPERTIES].some((property) =>
        message.includes(property),
      );

    if (isKnownSvgPropertyWarning) {
      return;
    }

    originalConsoleError.apply(console, args);
  };
}
