const url = require("url");

export default {
    methods: {
        route(uri, params) {
            if (params && typeof params === 'object') {
                for (let key in params) {
                    if (params.hasOwnProperty(key))
                        uri = uri.replace(`:${key}`, params[key])
                }
            }
            let host = process.env.API_SERVER;
            uri = url.resolve(host, `/api/frontend${uri}`);
            return uri;
        },
    },

    computed: {
        user() {
         return this.$store.state.auth.user
        },

        dev() {
            return this.$store.getters['ui/dev'];
        },
        loggedin(){
            return this.$store.state.auth.loggedIn;
        }
    }
};
