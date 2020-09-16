import lowdb, { LowdbAsync } from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'

export interface App {
  id?: string,
  name: string,
  version: string,
  config?: any,
}

export interface Schema {
  version: string,
  repository: string,
  apps: {
    rotation: App[],
    background: App[],
    available?: App[],
  }
}

export type Database = lowdb.LowdbAsync<Schema>

export default (path: string): Promise<Database> => {
  const adapter = new FileAsync<Schema>(path)
  const database = lowdb(adapter)

  return database
}
