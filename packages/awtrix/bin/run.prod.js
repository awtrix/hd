#!/usr/bin/env node

process.env.AWTRIX_MODE = 'static'
require('../dist/backend/cli').default(process.argv)
