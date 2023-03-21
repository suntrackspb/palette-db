export const copyToClipboard = (e) => {
  navigator.clipboard.writeText(e.target.textContent)
}