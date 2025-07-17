/**
 * 类型检查工具函数
 */

/**
 * 判断一个变量是否为Promise
 * @param value 要检查的变量
 * @returns 如果是Promise返回true，否则返回false
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as Record<string, unknown>).then === 'function' &&
    typeof (value as Record<string, unknown>).catch === 'function'
  );
}

/**
 * 判断一个变量是否为函数
 * @param value 要检查的变量
 * @returns 如果是函数返回true，否则返回false
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * 判断一个变量是否为异步函数
 * @param value 要检查的变量
 * @returns 如果是异步函数返回true，否则返回false
 */
export function isAsyncFunction(value: unknown): value is (...args: unknown[]) => Promise<unknown> {
  return isFunction(value) && value.constructor.name === 'AsyncFunction';
}

/**
 * 判断一个变量是否为普通函数（非异步）
 * @param value 要检查的变量
 * @returns 如果是普通函数返回true，否则返回false
 */
export function isSyncFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return isFunction(value) && !isAsyncFunction(value);
}

/**
 * 综合判断变量类型
 * @param value 要检查的变量
 * @returns 返回变量类型的字符串描述
 */
export function getVariableType(value: unknown): string {
  if (isPromise(value)) {
    return 'Promise';
  }
  if (isAsyncFunction(value)) {
    return 'AsyncFunction';
  }
  if (isSyncFunction(value)) {
    return 'Function';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'undefined') {
    return 'undefined';
  }
  return typeof value;
}

/**
 * 安全执行函数或Promise
 * @param value 要执行的函数或Promise
 * @param args 函数参数（如果value是函数）
 * @returns Promise结果
 */
export async function safeExecute(value: unknown, ...args: unknown[]): Promise<unknown> {
  if (isPromise(value)) {
    return await value;
  }
  if (isFunction(value)) {
    const result = value(...args);
    if (isPromise(result)) {
      return await result;
    }
    return result;
  }
  throw new Error('Value is neither a function nor a Promise');
}

/**
 * 示例用法
 */
export const examples = {
  // Promise示例
  promiseExample: () => {
    const promise = Promise.resolve('Hello');
    console.log('isPromise:', isPromise(promise)); // true
    console.log('isFunction:', isFunction(promise)); // false
  },

  // 普通函数示例
  functionExample: () => {
    const func = () => 'Hello';
    console.log('isPromise:', isPromise(func)); // false
    console.log('isFunction:', isFunction(func)); // true
    console.log('isAsyncFunction:', isAsyncFunction(func)); // false
    console.log('isSyncFunction:', isSyncFunction(func)); // true
  },

  // 异步函数示例
  asyncFunctionExample: () => {
    const asyncFunc = async () => 'Hello';
    console.log('isPromise:', isPromise(asyncFunc)); // false
    console.log('isFunction:', isFunction(asyncFunc)); // true
    console.log('isAsyncFunction:', isAsyncFunction(asyncFunc)); // true
    console.log('isSyncFunction:', isSyncFunction(asyncFunc)); // false
  },

  // 返回Promise的函数示例
  promiseReturningFunctionExample: () => {
    const promiseFunc = () => Promise.resolve('Hello');
    console.log('isPromise:', isPromise(promiseFunc)); // false
    console.log('isFunction:', isFunction(promiseFunc)); // true
    console.log('isAsyncFunction:', isAsyncFunction(promiseFunc)); // false
    console.log('isSyncFunction:', isSyncFunction(promiseFunc)); // true
  }
}; 