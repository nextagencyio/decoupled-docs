export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}
