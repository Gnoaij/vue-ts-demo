class Storage {
  get length() {
    return window.localStorage.length
  }

  getItem(key: string) {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }

  clearAll() {
    window.localStorage.clear()
  }
}

export default new Storage()
