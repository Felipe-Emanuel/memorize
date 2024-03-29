export function isAllAttributeFilled<T>(obj: T) {
  return Object.values(obj).every(
    (value) => value !== '' && value !== null && value !== undefined,
  )
}
