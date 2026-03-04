import Link from 'next/link'
import { DrupalChangelog } from '@/lib/types'

interface ChangelogCardProps {
  item: DrupalChangelog
}

export default function ChangelogCard({ item }: ChangelogCardProps) {
  return (
    <Link
      href={item.path || '#'}
      className="group flex items-center justify-between py-6 border-b border-primary-200 transition-all duration-200 hover:pl-1"
    >
      <div className="flex items-baseline gap-4">
        <h3 className="text-lg font-medium text-primary-900 group-hover:text-accent-500 transition-colors duration-200">
          {item.title}
        </h3>
        {(item as any).versionNumber && (
          <span className="font-mono text-sm text-primary-400">{(item as any).versionNumber}</span>
        )}
      </div>
      <span className="text-sm text-primary-400 shrink-0 ml-4">
        View
      </span>
    </Link>
  )
}
