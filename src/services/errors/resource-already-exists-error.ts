import { ApiError } from './api-error';

export class ResourceAlreadyExistsError extends ApiError {
  constructor(resource: string, key?: string, value?: string) {
    const message =
      key && value
        ? `${resource.charAt(0).toUpperCase() + resource.slice(1)} with ${key} ${value} already exists.`
        : `${resource.charAt(0).toUpperCase() + resource.slice(1)} already exists.`;

    super({
      statusCode: 409,
      message,
    });
  }
}
