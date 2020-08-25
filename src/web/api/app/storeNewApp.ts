import { Database } from 'src/utils/database'
import shortid from 'shortid'
import aggregateApp from './aggregateApp'

async function updateLaterIndexes(database: Database, index: number): Promise<void> {
  // Iterate through all other rotation apps and find those that are now run
  // later than the newly added app. Update those and increase their index by one.
  let apps = database.get(['apps', 'rotation']).value()

  for (let id of Object.keys(apps)) {
    let app = apps[id]
    if (app.index >= index) await database.set(['apps', 'rotation', id, 'index'], app.index + 1).write()
  }
}

export default async function (database: Database, key: 'background' | 'rotation', body: any): Promise<any> {
  let app: any = {
    name: body.name,
    version: body.version,
    config: {}
  }

  if (key == 'rotation') {
    // Make sure index is at most the number of apps we already have
    const availableApps = database.get(['apps', key]).keys().value().length
    app.index = Math.min(body.index || 0, availableApps)

    updateLaterIndexes(database, app.index)
  }

  // Add the app to our database
  const id = shortid.generate()
  await database.set(['apps', key, id], app).write()

  // Return the (aggregated) app
  return aggregateApp(database.get(['apps', key, id]).value(), id)
}
