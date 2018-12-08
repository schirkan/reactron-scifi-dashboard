export = index;
declare function index(func: any, wait: any, immediate: any): any;
declare namespace index {
  // Circular reference from index
  const debounce: any;
}