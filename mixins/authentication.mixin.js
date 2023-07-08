module.exports = {
    actions: {
        /**
         * @actions
         * @param {String} apiKey - API key
         * @returns {Object} - Authenticated user
         */
        findByApiKey: {
            params: {
                apiKey: {
                    type: "string",
                },
            },

            async handler(ctx) {
                const user = await this.adapter.findOne({ apiKeys: { $elemMatch: { token: ctx.params.apiKey } } });

                return user;
            },
        },
    },
};