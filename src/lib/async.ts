
export async function to<T>(promise: Promise<T>): Promise<[error: any, result: null] | [error: null, result: T]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error, null];
  }
}