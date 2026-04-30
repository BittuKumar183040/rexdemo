export const HorizontalScale = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative h-14 w-full border-y border-gray-300 ${className}`}>
      
      {/* Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              315deg,
              rgba(0, 188, 212, 0.4) 0px,
              rgba(0, 188, 212, 0.4) 1px,
              transparent 1px,
              transparent 10px
            )
          `,
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-white pointer-events-none" />
    </div>
  )
}