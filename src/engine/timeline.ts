// Pure function to reorder scenes using Array.prototype.splice.
// Returns a new array without mutating the original.

export function reorderScenes<T>(list: T[], from: number, to: number): T[] {
  if (!Array.isArray(list) || from < 0 || to < 0 || from >= list.length || to >= list.length || from === to) {
    return [...list];
  }
  const result = [...list];
  const [moved] = result.splice(from, 1);
  if (moved !== undefined) {
    result.splice(to, 0, moved);
  }
  return result;
}
