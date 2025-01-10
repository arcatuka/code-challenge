import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express TypeScript CRUD API",
    version: "1.0.0",
    description: "API documentation for the Express CRUD application",
  },
  servers: [
    {
      url: "http://localhost:4000",
    },
  ],
  components: {
    schemas: {
      Resource: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "The unique ID of the resource",
          },
          name: {
            type: "string",
            description: "The name of the resource",
          },
          description: {
            type: "string",
            description: "A brief description of the resource",
          },
          status: {
            type: "string",
            description: "The status of the resource (e.g., active)",
          },
        },
        required: ["name", "description"],
        example: {
          id: 1,
          name: "Test Resource",
          description: "This is a test resource",
          status: "active",
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message",
          },
        },
        example: {
          message: "Resource not found",
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
