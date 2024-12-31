import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const githubUrl = 'https://github.com/charlietlamb/review-rabbit'

export function HeaderGithub() {
  return (
    <Link
      href={githubUrl}
      className="h-full aspect-square flex items-center justify-center hover:bg-muted rounded-md transition-colors duration-300 cursor-pointer w-16 min-w-16"
    >
      <GitHubLogoIcon className="w-6 h-6" />
    </Link>
  )
}
