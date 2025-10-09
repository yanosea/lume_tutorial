export default function FontToggleButton() {
  return (
    <button
      type="button"
      id="font-toggle"
      aria-label="Toggle font style"
      aria-live="polite"
      class="flex items-center justify-center w-8 h-8 text-2xl rounded-lg cursor-pointer hover:opacity-80"
    >
      <span aria-hidden="true">🔡</span>
    </button>
  );
}
