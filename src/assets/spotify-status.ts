/**
 * Spotify Status Client Script
 * Fetches and displays currently playing or last played track
 */

interface Track {
  imageUrl: string;
  playedAt?: string;
  trackName: string;
  trackUrl: string;
  albumName: string;
  albumUrl: string;
  artistName: string;
  artistUrl: string;
}

// DOM element references
const container = document.getElementById(
  "spotify-status-container",
) as HTMLDivElement | null;
const albumImage = document.getElementById(
  "spotify-album-image",
) as HTMLImageElement | null;
const albumImageExpanded = document.getElementById(
  "spotify-album-image-expanded",
) as HTMLImageElement | null;
const statusText = document.getElementById(
  "spotify-status-text",
) as HTMLSpanElement | null;
const playedAtText = document.getElementById(
  "spotify-played-at",
) as HTMLSpanElement | null;
const trackLink = document.getElementById(
  "spotify-track-link",
) as HTMLAnchorElement | null;
const albumLink = document.getElementById(
  "spotify-album-link",
) as HTMLAnchorElement | null;
const artistLink = document.getElementById(
  "spotify-artist-link",
) as HTMLAnchorElement | null;
const loadingEl = document.getElementById(
  "spotify-loading",
) as HTMLDivElement | null;
const errorEl = document.getElementById(
  "spotify-error",
) as HTMLDivElement | null;
const iconEl = document.getElementById(
  "spotify-icon",
) as SVGElement | null;

/**
 * Get track information from API
 */
async function getTrackInfo(): Promise<[boolean, Track | undefined]> {
  const [nowPlayingUrl, lastPlayedUrl] = defineFetchUrl();

  // Fetch both APIs in parallel
  const [nowPlayingResult, lastPlayedResult] = await Promise.allSettled([
    fetchData(nowPlayingUrl || "")
      .then((response) => {
        console.log("fetched nowplaying!");
        return response;
      })
      .catch((_) => {
        console.error("failed fetching nowplaying...");
        return null;
      }),
    fetchData(lastPlayedUrl || "")
      .then((response) => {
        console.log("fetched lastplayed!");
        return response;
      })
      .catch((_) => {
        console.error("failed fetching lastplayed...");
        return null;
      }),
  ]);

  // Prioritize now-playing if available
  if (nowPlayingResult.status === "fulfilled" && nowPlayingResult.value) {
    try {
      return [true, await extractTrackData(nowPlayingResult.value, true)];
    } catch (error) {
      console.error("failed extracting nowplaying data...");
    }
  }

  // Fallback to last-played if now-playing is not available
  if (lastPlayedResult.status === "fulfilled" && lastPlayedResult.value) {
    try {
      return [false, await extractTrackData(lastPlayedResult.value, false)];
    } catch (error) {
      console.error("failed extracting lastplayed data...");
    }
  }

  // If both fail, return false and undefined
  return [false, undefined];
}

/**
 * Define fetch URLs based on environment
 */
function defineFetchUrl(): [string, string] {
  const isDevelopment = globalThis.location.hostname === "localhost" ||
    globalThis.location.hostname === "127.0.0.1";

  const baseUrl = isDevelopment
    ? "http://localhost:8080"
    : "https://api.yanosea.org";

  const nowPlayingUrl = `${baseUrl}/spotify/now-playing`;
  const lastPlayedUrl = `${baseUrl}/spotify/last-played`;
  return [nowPlayingUrl, lastPlayedUrl];
}

/**
 * Fetch data from URL
 */
async function fetchData(url: string): Promise<Response | null> {
  try {
    const response = await fetch(url);
    if (response.ok && response.status !== 204) {
      return response;
    }
    return null;
  } catch (error) {
    console.error(`failed fetching from ${url}`);
    return null;
  }
}

/**
 * Extract track data from API response
 */
async function extractTrackData(
  response: Response,
  nowPlaying: boolean,
): Promise<Track> {
  const responseData = await response.json();
  const data = responseData.track;
  const track: Track = {
    imageUrl: data.imageUrl,
    playedAt: !nowPlaying ? data.playedAt : undefined,
    trackName: data.trackName,
    trackUrl: data.trackUrl,
    albumName: data.albumName,
    albumUrl: data.albumUrl,
    artistName: data.artistName,
    artistUrl: data.artistUrl,
  };
  return track;
}

/**
 * Format played at timestamp
 */
function formatPlayedAt(playedAt: string): string {
  const date = new Date(playedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

/**
 * Update UI with track information
 */
function updateUI(isNowPlaying: boolean, track: Track) {
  if (!container) return;

  // Hide loading, show container
  if (loadingEl) loadingEl.classList.add("hidden");
  if (errorEl) errorEl.classList.add("hidden");
  container.classList.remove("hidden");

  // Update status text and icon
  if (statusText) {
    statusText.textContent = isNowPlaying
      ? "yanosea Now Playing!"
      : "yanosea Last Played...";
  }
  if (iconEl && statusText) {
    if (isNowPlaying) {
      // Green (accent) for now playing
      iconEl.classList.remove("text-red");
      iconEl.classList.add("text-accent");
      statusText.classList.remove("text-red");
      statusText.classList.add("text-accent");
      iconEl.classList.add("animate-pulse");
    } else {
      // Red for last played
      iconEl.classList.remove("text-accent");
      iconEl.classList.add("text-red");
      statusText.classList.remove("text-accent");
      statusText.classList.add("text-red");
      iconEl.classList.remove("animate-pulse");
    }
  }

  // Update played at time
  if (playedAtText) {
    if (track.playedAt) {
      playedAtText.textContent = `at ${track.playedAt}`;
    } else {
      playedAtText.textContent = "";
    }
  }

  // Update album images (both compact and expanded views)
  if (albumImage) {
    albumImage.src = track.imageUrl;
    albumImage.alt = `${track.albumName} artwork`;
  }
  if (albumImageExpanded) {
    albumImageExpanded.src = track.imageUrl;
    albumImageExpanded.alt = `${track.albumName} artwork`;
  }

  // Update track link
  if (trackLink) {
    trackLink.href = track.trackUrl;
    trackLink.textContent = track.trackName;
  }

  // Update album link
  if (albumLink) {
    albumLink.href = track.albumUrl;
    albumLink.textContent = track.albumName;
  }

  // Update artist link
  if (artistLink) {
    artistLink.href = track.artistUrl;
    artistLink.textContent = track.artistName;
  }
}

/**
 * Show error state
 */
function showError() {
  if (loadingEl) loadingEl.classList.add("hidden");
  if (errorEl) errorEl.classList.remove("hidden");
  if (container) container.classList.remove("hidden");
}

/**
 * Fetch and update Spotify status
 */
async function updateSpotifyStatus() {
  try {
    const [isNowPlaying, track] = await getTrackInfo();

    if (track) {
      updateUI(isNowPlaying, track);
    } else {
      showError();
    }
  } catch (error) {
    console.error("Error updating Spotify status:", error);
    showError();
  }
}

// Initialize on page load
updateSpotifyStatus();

// Update every 60 seconds
setInterval(updateSpotifyStatus, 60000);
