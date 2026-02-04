import { join } from 'node:path'

const UPLOAD_DIR = join(import.meta.dir, '../uploads')

export const uploadFile = async (file: File) => {
  const filename = `${Date.now()}-${file.name}`
  const path = join(UPLOAD_DIR, filename)
  
  await Bun.write(path, file)
  
  return `/uploads/${filename}`
}