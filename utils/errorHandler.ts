export default async function errorHandler(
  func: Function,
  exceptionFunc?: (e?: unknown) => JSX.Element | string | null | void,
) {
  try {
    const returnResult = await func();
    return returnResult;
  } catch (e) {
    if (exceptionFunc) {
      return exceptionFunc(e);
    }
  }
}
