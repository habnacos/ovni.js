const { Base } = require('./core/base')
const express = require('express')
const path = require('path')

// Intializations
const base = new Base ({
    // Globals Variables
    express: express,
    base: 'base',
    __path: __dirname,
    pathJoin: path.join,
    expressStatic: express.static,
    pool: require('./core/sql/database'),
})

base.run()