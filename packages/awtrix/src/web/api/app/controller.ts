import createRouter from '../createRouter'
import aggregateApp from './aggregateApp'
import storeNewApp from './storeNewApp'
import { spawn } from 'child_process'

const { router, bind } = createRouter()


/**
 * Allows the user to get a list of all apps that have been downloaded
 * from the app store.
 */
router.get('/api/apps/available', (ctx) => {
  let apps = ctx.database.get(['apps', 'available'], [])
  ctx.body = apps.value()
})

/**
 * Allows the user to get a list of all apps that are currently configured
 * to run in the app rotation.
 */
router.get('/api/apps/rotation', (ctx) => {
  let apps = ctx.database.get(['apps', 'rotation']).map(aggregateApp)
  ctx.body = apps.value()
})

/**
 * Allows the user to get a list of all apps that are currently configured
 * to run in the background, but not the app rotation.
 */
router.get('/api/apps/background', (ctx) => {
  let apps = ctx.database.get(['apps', 'background']).map(aggregateApp)
  ctx.body = apps.value()
})

/**
 * Add a new app to the rotation at a specific index. If the used index
 * is already in use, all current apps from that index on will be moved.
 */
router.post('/api/apps/rotation', async (ctx) => {
  // TODO: Perform body validation
  let app = await storeNewApp(ctx.database, 'rotation', ctx.request.body)
  ctx.body = app
})

/**
 * Add a new app to the background list.
 */
router.post('/api/apps/background', async (ctx) => {
  const body = { name: 'people-in-space', version: '1.0', index: 1 }

  let app = await storeNewApp(ctx.database, 'background', body)
  ctx.body = app
})

/**
 * Updates the app with the given ID. This could update its index
 * (if it's within the app rotation) or its configuration.
 */
router.put('/api/apps/:id', (ctx, next) => {

})

/**
 * Deletes an app from the app rotation or background app list.
 */
router.delete('/api/apps/:id', async (ctx) => {
  // TODO: Find out if we want to return the deleted object.
  await ctx.database
    .unset(['apps', 'rotation', ctx.params.id])
    .unset(['apps', 'background', ctx.params.id])
    .write()

  // TODO: Unshift all later indexes

  ctx.body = ''
})

/**
 * Changes the brightness of the LCD
 */
router.post('/api/system/brightness/:brightness', async (ctx) => {
  try {
    const child = spawn('gpio', ['-g', 'pwm', '18', ctx.params.brightness])
  } catch (e) { }

  ctx.body = ''
})

export default bind
