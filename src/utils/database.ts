import lowdb, { LowdbAsync } from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'

export interface App {
  name: string,
  version: string,
  config: any,
}

export interface RotationApp extends App {
  index: number,
}

export interface Schema {
  version: string,
  repository: string,
  apps: {
    rotation: { [key: string]: RotationApp },
    background: { [key: string]: App }
  }
}

export type Database = lowdb.LowdbAsync<Schema>

export default (path: string): Promise<Database> => {
  const adapter = new FileAsync<Schema>(path)
  const database = lowdb(adapter)

  return database
}
