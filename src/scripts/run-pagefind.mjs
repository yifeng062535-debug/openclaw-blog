import { spawnSync } from 'node:child_process'
import process from 'node:process'

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const result = spawnSync(command, ['pagefind', '--site', 'dist'], {
  stdio: 'inherit',
  shell: false,
})

if (result.status === 0) {
  process.exit(0)
}

if (process.platform === 'win32') {
  console.warn('Pagefind binary is unavailable on this Windows environment; skipping local search index generation.')
  process.exit(0)
}

process.exit(result.status ?? 1)
