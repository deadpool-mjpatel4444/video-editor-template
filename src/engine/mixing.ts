import type { AudioTrackItem } from "../schemas/templates";

/**
 * Crossfade between consecutive audio tracks
 * Each track fades out as the next one fades in
 */
export function crossfade(tracks: AudioTrackItem[]): AudioTrackItem[] {
  if (tracks.length <= 1) return tracks;

  const CROSSFADE_FRAMES = 30; // 1 second at 30fps

  return tracks.map((track, idx) => {
    const nextTrack = tracks[idx + 1];
    if (!nextTrack) return track;

    const fadeOutStart = track.startAtFrame
      ? track.startAtFrame + (nextTrack.startAtFrame || 0) - CROSSFADE_FRAMES
      : (nextTrack.startAtFrame || 0) - CROSSFADE_FRAMES;

    return {
      ...track,
      // Volume curves from 1 to 0 during crossfade
      volume: Math.max(0, track.volume ?? 1 - (CROSSFADE_FRAMES - Math.max(0, (nextTrack.startAtFrame || 0) - (track.startAtFrame || 0))) / CROSSFADE_FRAMES),
    };
  });
}

/**
 * Duck background music when there's a primary track
 * Reduces volume of non-primary tracks by 60%
 */
export function duck(tracks: AudioTrackItem[]): AudioTrackItem[] {
  if (tracks.length <= 1) return tracks;

  // First track is primary, rest are background
  return tracks.map((track, idx) => ({
    ...track,
    volume: idx === 0 ? (track.volume ?? 1) : (track.volume ?? 1) * 0.4,
  }));
}
