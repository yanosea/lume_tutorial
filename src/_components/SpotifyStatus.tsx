/**
 * Spotify Status Component
 * Displays currently playing or last played track from Spotify
 * Compact widget-style design with glassmorphism effects
 */
export default function SpotifyStatus() {
  return (
    <div
      id="spotify-status-container"
      className="group hidden fixed bottom-20 right-6 z-50 w-16 h-16 transition-all duration-300 hover:w-80 hover:h-auto"
    >
      {/* Compact view - Album art only */}
      <div className="absolute inset-0 group-hover:hidden">
        <div className="relative w-full h-full">
          <img
            id="spotify-album-image"
            src=""
            alt="Album artwork"
            className="w-full h-full rounded-xl object-cover shadow-2xl ring-2 ring-border/50"
          />
          {/* Playing indicator badge */}
          <div className="absolute -bottom-1 -right-1 flex items-center bg-accent rounded-md px-1.5 py-0.5 shadow-lg">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-2 bg-background rounded-full animate-[music-bar_0.8s_ease-in-out_infinite]" />
              <div className="w-0.5 h-2 bg-background rounded-full animate-[music-bar_0.8s_ease-in-out_0.2s_infinite]" />
              <div className="w-0.5 h-2 bg-background rounded-full animate-[music-bar_0.8s_ease-in-out_0.4s_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* Expanded view on hover */}
      <div className="hidden group-hover:block rounded-xl border border-border/50 bg-surface/95 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="relative p-4">
          {/* Gradient overlay background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />

          {/* Main content */}
          <div className="relative flex items-start gap-3">
            {/* Album artwork */}
            <div className="relative shrink-0">
              <img
                id="spotify-album-image-expanded"
                src=""
                alt="Album artwork"
                className="h-16 w-16 rounded-lg object-cover shadow-lg ring-1 ring-border/30"
              />
            </div>

            {/* Track information */}
            <div className="flex-1 min-w-0">
              {/* Status indicator */}
              <a
                id="spotify-status-link"
                href="https://open.spotify.com/user/314sfaf6ikzxgxpur7hwflapmc4m"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mb-2 px-2 py-0.5 rounded-md bg-surface/50 backdrop-blur-sm border border-border/30 transition-all hover:border-accent/50 hover:bg-accent/10"
              >
                <svg
                  id="spotify-icon"
                  className="h-3 w-3 fill-current text-accent"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span
                  id="spotify-status-text"
                  className="text-xs font-semibold text-accent"
                >
                  yanosea
                </span>
              </a>

              {/* Track name */}
              <a
                id="spotify-track-link"
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-primary hover:text-accent transition-colors truncate mb-1"
              >
              </a>

              {/* Album and artist */}
              <div className="text-xs text-secondary truncate">
                <a
                  id="spotify-album-link"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors hover:underline"
                >
                </a>
                <span className="mx-1">•</span>
                <a
                  id="spotify-artist-link"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors hover:underline"
                >
                </a>
              </div>

              {/* Played at timestamp */}
              <span
                id="spotify-played-at"
                className="block text-xs text-tertiary/70 mt-1 truncate"
              >
              </span>
            </div>
          </div>
        </div>

        {/* Loading state */}
        <div
          id="spotify-loading"
          className="absolute inset-0 flex items-center justify-center bg-surface/95 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-secondary font-medium">Loading...</span>
          </div>
        </div>

        {/* Error state */}
        <div
          id="spotify-error"
          className="hidden absolute inset-0 flex items-center justify-center bg-surface/95 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="text-2xl mb-1">🎵</div>
            <p className="text-xs text-tertiary">Unable to load</p>
          </div>
        </div>
      </div>
    </div>
  );
}
