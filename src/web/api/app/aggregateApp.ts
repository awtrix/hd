import { Database, App, RotationApp } from 'src/utils/database'

export default function (app: App | RotationApp, id: string): any {
  // TODO: Add meta-info from app configuration
  return  { id, ...app }
}
