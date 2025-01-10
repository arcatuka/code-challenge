import Resource from "../models/resource.model";
import {
  ResourceRequest,
  ResourceResponse,
  ErrorResponse,
} from "../models/custom.models";

// Create a resource
export const createResource = async (
  req: ResourceRequest,
  res: (response: ResourceResponse | ErrorResponse) => void
): Promise<void> => {
  try {
    const { name, description } = req;

    if (!name || !description) {
      return res({
        message: "Invalid data. Name and description are required.",
      });
    }

    const resource = await Resource.create({ name, description });
    res({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      status: resource.status,
    });
  } catch (error) {
    res({ message: "Failed to create resource." });
  }
};

// List all resources
export const listResources = async (
  req: {},
  res: (response: ResourceResponse[] | ErrorResponse) => void
): Promise<void> => {
  try {
    const resources = await Resource.findAll();
    const resourceList: ResourceResponse[] = resources.map((resource) => ({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      status: resource.status,
    }));
    res(resourceList);
  } catch (error) {
    res({ message: "Failed to fetch resources." });
  }
};

// Get resource by ID
export const getResource = async (
  req: { id: string },
  res: (response: ResourceResponse | ErrorResponse) => void
): Promise<void> => {
  try {
    const { id } = req;

    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res({ message: "Resource not found." });
    }

    res({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      status: resource.status,
    });
  } catch (error) {
    res({ message: "Failed to fetch resource." });
  }
};

// Update a resource
export const updateResource = async (
  req: ResourceRequest & { id: string },
  res: (response: ResourceResponse | ErrorResponse) => void
): Promise<void> => {
  try {
    const { id, name, description } = req;

    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res({ message: "Resource not found." });
    }

    if (name) resource.name = name;
    if (description) resource.description = description;

    await resource.save();

    res({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      status: resource.status,
    });
  } catch (error) {
    res({ message: "Failed to update resource." });
  }
};

// Delete a resource
export const deleteResource = async (
  req: { id: string },
  res: (response: { message: string } | ErrorResponse) => void
): Promise<void> => {
  try {
    const { id } = req;

    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res({ message: "Resource not found." });
    }

    await resource.destroy();
    res({ message: "Resource deleted successfully." });
  } catch (error) {
    res({ message: "Failed to delete resource." });
  }
};
