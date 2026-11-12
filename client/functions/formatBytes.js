// bytes a texto legible (B/KB/MB) para mostrar el tamaño de un archivo
// adjunto en proyectos
export default function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
