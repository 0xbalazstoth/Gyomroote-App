const bcrypt = require("bcrypt");
const hat = require("hat");
const UserNotFoundError = require("../exceptions/userNotFound.error");

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
                // Find the user by API key
                const user = await this.adapter.findOne({ apiKeys: { $elemMatch: { token: ctx.params.apiKey } } });
                return user;
            },
        },
        
        login: {
            auth: false,
            params: {
                email: {
                    type: "email",
                },
                password: {
                    type: "string",
                },
            },

            async handler(ctx) {
                const { email, password } = ctx.params;

                const user = await this.adapter.findOne({ email });

                if (!user)
                {
                    throw new UserNotFoundError();
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch)
                {
                    throw new UnAuthorizedError();
                }

                const apiKey = {
                    token: hat(256),
                };

                user.apiKeys.push(apiKey);

                await user.save();
                const response = await this.transformDocuments(ctx, {}, user);
                return { ...response, apiKeys: [apiKey] }
            },
        },
    },
};