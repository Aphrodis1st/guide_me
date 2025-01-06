import { responses } from "../responses";

const createplace = {
  tags: ["Places"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Creating place",
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name",
              required: true,
              example: "Nyungwe",
            },
            title: {
              type: "string",
              description: "Title of place",
              required: true,
              example: "Nyungwe",
            },
            description: {
              type: "string",
              description: "Description of the place",
              required: true,
              example: "Nyungwe national park is ...",
            },
            images: {
              type: "array",
              items: {
                minItems: 4,
                type: "file",
              },
            },
            categoryId: {
              type: "string",
              description: "Category of place (id)",
              required: true,
              format: "uuid",
            },
          },
        },
      },
    },
  },
  consumes: ["application/json"],
  responses,
};

const read_places = {
  all: {
    tags: ["Places"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "List of all the places",
    description: "Get all of the places",
    responses,
  },
  single: {
    tags: ["Places"],
    security: [
      {
        bearerAuth: [],
      },
    ],
    summary: "Get a single place",
    description: "Get a single place",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
          format: "uuid",
        },
      },
    ],
    responses,
  },
};

const update_product = {
  tags: ["Places"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Updating a place",
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "place name",
              required: true,
              example: "Nyungwe",
            },
            title: {
              type: "string",
              description: "Title place",
              required: true,
              example: "Nyungwe",
            },
            description: {
              type: "string",
              description: "Description of the place",
              required: true,
              example: "Nyungwe",
            },
            images: {
              type: "array",
              items: {
                minItems: 4,
                type: "file",
              },
            },
            categoryId: {
              type: "string",
              description: "Category of place (id)",
              required: true,
              format: "uuid",
            },
          },
        },
      },
    },
  },
  responses,
};

const delete_product = {
  tags: ["Places"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  summary: "Deleting a place",
  parameters: [
    {
      in: "path",
      name: "ID",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  responses,
};

export const places = {
  "/api/v1/place": {
    post: createplace,
  },
  "/api/v1/places/": {
    get: read_places["all"],
  },
  "/api/v1/places/{id}": {
    get: read_places["single"],
  },
  "/api/v1/places/{id}/": {
    patch: update_product,
  },
  "/api/v1/places/{ID}": {
    delete: delete_product,
  },
};
