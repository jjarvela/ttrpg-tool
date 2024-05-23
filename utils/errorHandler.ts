export default async function errorHandler(
  func: Function,
  exceptionFunc?: Function,
) {
  try {
    const returnResult = await func();
    return returnResult;
  } catch (e) {
    if (exceptionFunc) {
      return exceptionFunc();
    }
  }
}
