export default async function errorHandler(
  func: Function,
  exceptionFunc?: Function,
) {
  try {
    return func();
  } catch (e) {
    if (exceptionFunc) {
      exceptionFunc();
    }
  }
}
