import { responses } from "../responses";

const role_routes = {
  read_all: {
    tags: ["Role"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Get Roles",
    consumes: ["application/json"],
    responses,
  },
  create_role: {
    tags: ["Role"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Create Role",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              roleName: {
                type: "string",
                example: "PROVIDER",
              },
            },
          },
        },
      },
    },
    responses,
  },
  Assign_role: {
    tags: ["Role"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Assign role user",
    parameters: [
      {
        in: "path",
        name: "userId",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              roleName: {
                type: "string",
                required: true,
                example: "PROVIDER",
              },
            },
          },
        },
      },
    },
    responses,
  },
  Edit_role: {
    tags: ["Role"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Edit Role",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              roleName: {
                type: "string",
                required: true,
                example: "PROVIDER",
              },
            },
          },
        },
      },
    },
    responses,
  },
};

export const roles = {
  "/api/v1/roles": {
    get: role_routes["read_all"],
  },
  "/api/v1/roles/": {
    post: role_routes["create_role"],
  },
  "/api/v1/roles/{id}": {
    post: role_routes["Edit_role"],
  },
  "/api/v1/roles/{userId}": {
    patch: role_routes["Assign_role"],
  },
};
