export const pushHistory = (history, resourceName) => {
  const pathname = history.location.pathname
  const newPathname = pathname.replace(/\/\w*$/, resourceName)
  if(pathname === newPathname) return
  history.push(newPathname)
}

export const getPath = (resourceName) => {
  const pathname = window.location.pathname
  return pathname.replace(/\/\w*$/, resourceName)
}