import { join } from 'node:path'
import { serverEnv } from "@monorepo-typesafe/env/server";

const UPLOAD_DIR = join(import.meta.dir, '..', serverEnv.UPLOAD_DIR)

export const uploadFile = async (file: File) => {
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const path = join(UPLOAD_DIR, filename)
  
  await Bun.write(path, file)
  
  return `${serverEnv.UPLOAD_PREFIX}/${filename}`
}