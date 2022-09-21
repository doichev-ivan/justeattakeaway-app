const restUrls = {
  Rooms: '/rooms'
}

export type RestUrlsKeys = keyof typeof restUrls
export type RestUrlsValues = typeof restUrls[RestUrlsKeys]

export default restUrls
