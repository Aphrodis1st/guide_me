import { DEPLOYED_URL, PORT } from "../utils/keys";

const basicInfo = {
  openapi: "3.0.0",
  info: {
    title: "guideMe",
    description: "guideMe api docs",
    version: "1.0.0",
  },

  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server",
    },
    {
      url: DEPLOYED_URL,
      description: "Production server ",
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
