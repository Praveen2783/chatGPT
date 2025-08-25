export function cn(...inputs) {
  // Simple className merger for JavaScript projects
  return inputs.flat().filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}