import { DEPLOYED_URL, PORT, SERVER_URL } from "../utils/keys";

const basicInfo = {
	openapi: "3.0.0",
	info: {
		title: "Art's Corner",
		description: "Art's Corner api docs",
		version: "1.0.0",
	},

	servers: [
		{
			url: SERVER_URL || `http://localhost:${PORT}`,
			description: "Development server",
		},
		{
			url: DEPLOYED_URL,
			description: "Production server (HTTPS)",
		},
	],
	security: [
		{
			google_auth: [],
		},
	],

	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
};

export default basicInfo;
