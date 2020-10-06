import { Database, App } from 'src/utils/database'

export default function (app: App): any {
  // TODO: Add meta-info from app configuration
  return  { ...app }
}
