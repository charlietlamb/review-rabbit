import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'

const rootDir = process.cwd()
const sourceEnvPath = join(rootDir, '.env')

// Define target directories relative to root
const targetDirs = [
  'apps/web',
  'apps/api',
  'packages/database',
  // Add other directories as needed
]

function syncEnvFiles() {
  if (!existsSync(sourceEnvPath)) {
    console.error('Root .env file not found!')
    process.exit(1)
  }

  targetDirs.forEach((dir) => {
    const targetPath = join(rootDir, dir, '.env')
    const targetDir = dirname(targetPath)

    // Ensure target directory exists
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }

    // Copy the file
    try {
      copyFileSync(sourceEnvPath, targetPath)
      console.log(`✅ Synced .env to ${dir}`)
    } catch (error) {
      console.error(`❌ Failed to sync .env to ${dir}:`, error)
    }
  })
}

syncEnvFiles()
