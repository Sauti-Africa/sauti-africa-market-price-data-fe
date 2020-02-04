import axios from 'axios'

// Basic caching implemented with a Least Recently Used eviction strategy
// Check if key (URL) is in the cache.
// - if not, add it to the head of the Map structure
// - if it already exists, remove it from its current position and add it to the head
// If we've reached the cache size limit, remove the last item (least recently used) from the tail
// Return cached value or undefined if not found
//
// `superlist` holds the data which populates the dropdowns on the data grid and never expires

let cache = {
  maxEntries: 20,
  cacheData: new Map(),
  superlist: null,
  get: function(key) {
    if (key.includes('superlist')) return this.superlist
    const hasKey = this.cacheData.has(key)
    let value
    if (hasKey) {
      value = this.cacheData.get(key)
      this.cacheData.delete(key)
      this.cacheData.set(key, value)
    }
    return value
  },
  set: function(key, value) {
    if (key.includes('superlist')) {
      this.superlist = value
    } else {
      if (this.cacheData.size >= this.maxEntries) {
        // LRU cache eviction
        const keyToDelete = this.cacheData.keys().next().value
        this.cacheData.delete(keyToDelete)
      }
      this.cacheData.set(key, value)
    }
  },
  del: function(key) {
    this.cacheData.delete(key)
  }
}

// Wrapper for axios get calls providing caching and adding bearer token to the headers and setting baseURL
export const axiosWithAuth = (token, exclude) => {
  return {
    get: async function(path, params) {
      // If query is already in the cache, return it without calling the server
      const found = cache.get(path)
      if (found) return found
      // Otherwise call the API
      try {
        const response = await axios.get(path, {
          ...params,
          headers: { Authorization: `Bearer ${token}` },
          baseURL:
            process.env.NODE_ENV !== 'development'
              ? 'https://sauti-marketprice-data.herokuapp.com/'
              : 'https://sauti-marketprice-data.herokuapp.com/'
        })
        // If this path isn't excluded from caching, add the response from the API to the cache and return it
        if (!exclude) cache.set(path, response)
        return response
        // Else return an error message
      } catch (error) {
        return { error }
      }
    }
  }
}
