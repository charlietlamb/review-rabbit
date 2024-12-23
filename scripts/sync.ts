import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'

const rootDir = process.cwd()
const sourceEnvPath = join(rootDir, '.env')

// Define target directories relative to root, excluding 'apps/api'
const targetDirs = ['apps/web', 'apps/api', 'packages/database']

function syncEnvFiles() {
  if (!existsSync(sourceEnvPath)) {
    console.error('Root .env file not found!')
    process.exit(1)
  }

  // Sync .env to target directories
  targetDirs.forEach((dir) => {
    const targetEnvPath = join(rootDir, dir, '.env')
    const targetDir = dirname(targetEnvPath)

    // Ensure target directory exists
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }

    // Copy the .env file
    try {
      copyFileSync(sourceEnvPath, targetEnvPath)
      console.log(`✅ Synced .env to ${dir}`)
    } catch (error) {
      console.error(`❌ Failed to sync .env to ${dir}:`, error)
    }
  })

  // Write .env to apps/api/.dev.vars
  const apiDevVarsPath = join(rootDir, 'apps/api/.dev.vars')
  const apiDevVarsDir = dirname(apiDevVarsPath)

  // Ensure apps/api directory exists
  if (!existsSync(apiDevVarsDir)) {
    mkdirSync(apiDevVarsDir, { recursive: true })
  }

  // Copy .env as .dev.vars to apps/api
  try {
    copyFileSync(sourceEnvPath, apiDevVarsPath)
    console.log('✅ Synced .env to apps/api/.dev.vars')
  } catch (error) {
    console.error('❌ Failed to sync .env to apps/api/.dev.vars:', error)
  }
}

syncEnvFiles()
