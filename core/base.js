module.exports.Base = class {
    constructor(varGlobals) {
        this.message = []
        this.app = varGlobals.express()
        this.globals(varGlobals)
        this.widdlewares()
        this.settings(require('./settings'))
        this.route(require('./routers'))
    }

    globals(object) {
        for (const [key, value] of Object.entries(object)) global[key] = value
    }

    settings(settings) {
        const exphbs = require('express-handlebars')

        for (const [key, value] of Object.entries(settings.set)) this.app.set(key, value)
        this.globals(settings.globals)

        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: pathJoin(this.app.get('templates'), 'layouts'),
            partialsDir: pathJoin(this.app.get('templates'), 'partials'),
            extname: '.hbs',
            helpers: require('./lib/handlebars')
        }))
    }

    widdlewares() {
        const session = require('express-session')

        this.app.use(session({
            secret : 's3Cur3',
            name : 'sessionId',
            resave: false,
            saveUninitialized: false,
            cookie: {
                expires: 600000
            }
        }));
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    parametersGet(url) {
        global.$_GET = {}
        let parameters = url.split('?')[1]
        if (parameters) {
            parameters.split('&').forEach(v => {
                let get = v.split('=')
                if (get[0]) $_GET[get[0]] = get[1]
            });
        }
    }

    parametersPost(body) {
        global.$_POST = {}
        for (const [key, value] of Object.entries(body)) if (key) $_POST[key] = value
    }

    route(routes) {
        routes.forEach(route => {
            this.app.use(`${route.route}`, (req, res, next) => {
                var ro = route.route, mo = route.module || route.resource;
                let params = route.route.split(':').slice(1)
                // req.session.__message = req.session.__message || []
                const addMessage = (message, type) => { req.session.__message.push({ message, type }) }
                this.globals({
                    router:     express.Router(),
                    data:       { title: __title, base: base, message: req.session.__message },
                    addMessage: addMessage
                })
                console.log(req.session.__message)

                for (let p of params) {
                    p = p.replace('/', '')
                    ro = ro.replace(`:${p}`, req.params[p])
                    mo = mo.replace(`:${p}`, req.params[p])
                }

                try {
                    if (route.module)this.app.use(ro, require(mo))
                    if (route.resource) this.app.use(ro, expressStatic(mo))
                    next()
                } catch (error) { res.status(404).send('404') }

            })
        })
        // this.app.use(express.favicon(`${__public }/public/image/favicon.ico`));
        this.app.get('/favicon.ico', (req, res) => res.sendFile(`${__public }/image/favicon.ico`));
    }

    run() {
        this.app.use((req, res, next) => {
            this.parametersGet(req.url)
            this.parametersPost(req.body)
            next()
        }); this.app.listen(this.app.get('port'), () => { console.log(this.app.get('port')) })
    }
}