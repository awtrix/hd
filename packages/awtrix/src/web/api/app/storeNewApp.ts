import { Database } from 'src/utils/database'
import shortid from 'shortid'
import aggregateApp from './aggregateApp'

export default async function (database: Database, key: 'background' | 'rotation', body: any): Promise<any> {
  let index: number = body.index || 0
  let app: any = {
    id: body.id || shortid.generate(),
    name: body.name,
    version: body.version,
    config: {}
  }

  if (key == 'rotation') {
    // Make sure index is at most the number of apps we already have
    const availableApps = database.get(['apps', key]).keys().value().length
    index = Math.min(index, availableApps)
  }

  const apps = database.get(['apps', key]).value()
  apps.splice(index, 0, app)

  // Add the app to our database
  await database.set(['apps', key], apps).write()

  // Return the (aggregated) app
  return aggregateApp(database.get(['apps', key, index]).value())
}
