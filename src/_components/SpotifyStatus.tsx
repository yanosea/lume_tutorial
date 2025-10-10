/**
 * Spotify Status Component
 * Displays currently playing or last played track from Spotify
 */
export default function SpotifyStatus() {
  return (
    <div
      id="spotify-status-container"
      className="hidden rounded-lg border border-border bg-surface p-4 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        {/* Album artwork */}
        <div className="shrink-0">
          <img
            id="spotify-album-image"
            src=""
            alt="Album artwork"
            className="h-20 w-20 rounded-md object-cover shadow-sm"
          />
        </div>

        {/* Track information */}
        <div className="flex-1 min-w-0">
          {/* Status indicator */}
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <a
              id="spotify-status-link"
              href="https://open.spotify.com/user/314sfaf6ikzxgxpur7hwflapmc4m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:opacity-80"
            >
              <svg
                id="spotify-icon"
                className="h-4 w-4 fill-current text-accent"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span
                id="spotify-status-text"
                className="text-xs font-medium text-accent"
              >
                yanosea Now Playing!
              </span>
            </a>
            <span
              id="spotify-played-at"
              className="text-xs text-tertiary"
            >
            </span>
          </div>

          {/* Track name */}
          <a
            id="spotify-track-link"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-1 text-base font-semibold link-spotify truncate"
          >
          </a>

          {/* Album and artist */}
          <div className="text-sm text-secondary">
            <a
              id="spotify-album-link"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors hover:underline"
            >
            </a>
            <span className="mx-1.5">-</span>
            <a
              id="spotify-artist-link"
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors hover:underline"
            >
            </a>
          </div>
        </div>
      </div>

      {/* Loading state */}
      <div
        id="spotify-loading"
        className="flex items-center gap-2 text-sm text-tertiary"
      >
        <div className="h-1 w-1 rounded-full bg-accent animate-pulse"></div>
        <span>Loading...</span>
      </div>

      {/* Error state */}
      <div
        id="spotify-error"
        className="hidden text-sm text-tertiary"
      >
        Unable to load Spotify status
      </div>
    </div>
  );
}
