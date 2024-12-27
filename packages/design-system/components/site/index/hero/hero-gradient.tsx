import React from 'react'

export function HeroGradient() {
  return (
    <>
      {/* Modern gradient backdrop */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-primary/30 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Gradient orbs in the background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/30 to-transparent blur-3xl animate-slow-drift" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-l from-primary/20 to-transparent blur-3xl animate-slow-drift-reverse" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-t from-primary/10 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="absolute inset-0">
        {/* Bright gradient lines */}
        <div className="absolute inset-y-0 left-[15%] w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-glow" />
        </div>
        <div className="absolute inset-y-0 right-[15%] w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-glow-delayed" />
        </div>

        {/* Modern diagonal accent lines */}
        <div className="absolute top-[20%] left-0 w-[150px] h-[1px] rotate-[30deg] bg-gradient-to-r from-primary/50 to-transparent animate-slide-right">
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-shimmer" />
        </div>
        <div className="absolute top-[20%] right-0 w-[150px] h-[1px] -rotate-[30deg] bg-gradient-to-l from-primary/50 to-transparent animate-slide-left">
          <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Enhanced corner accents - positioned lower */}
        <div className="absolute top-[20%] left-8 w-32 h-32">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 to-transparent animate-fade-right">
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-primary/50 to-transparent animate-fade-down">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent animate-shimmer-vertical" />
            </div>
            {/* Modern corner gradient */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-radial from-primary/30 to-transparent animate-pulse-bright" />
          </div>
        </div>
        <div className="absolute top-[20%] right-8 w-32 h-32">
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-primary/50 to-transparent animate-fade-left">
              <div className="absolute inset-0 bg-gradient-to-l from-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-primary/50 to-transparent animate-fade-down">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent animate-shimmer-vertical" />
            </div>
            {/* Modern corner gradient */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-radial from-primary/30 to-transparent animate-pulse-bright" />
          </div>
        </div>

        {/* Scanning line effect - more subtle */}
        <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>

        {/* Modern mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary)/.08),transparent_65%)]" />
      </div>

      {/* Subtle modern grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary)/0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(var(--primary)/0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
    </>
  )
}
