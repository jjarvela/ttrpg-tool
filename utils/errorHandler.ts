export default async function errorHandler(
  this: any,
  func: Function,
  args1: Array<any>,
  exceptionFunc?: Function,
  args2?: Array<any>,
) {
  try {
    return func.apply(this, args1);
  } catch (e) {
    if (exceptionFunc) {
      exceptionFunc.apply(this, args2);
    }
    throw new Error((e as Error).message);
  }
}
