import defaultSettings from '@/settings'

const title = defaultSettings.title || 'KG-QA'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
