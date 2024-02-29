export function withNextTickLoading(Proto) {
  return class NextTickLoader extends Proto {
    load(...args) {
      setTimeout(() => super.load(...args), 0)
    }
  }
}