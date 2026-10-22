import {sharedTypes} from './sharedPages'
import {marketingTypes} from './marketingPages'
import {collectionTypes} from './collectionPages'
import localizedText from './localizedText'
import contactPage from './contactPage'
import siteSettings from './siteSettings'

export const schemaTypes = [
  localizedText,
  contactPage,
  siteSettings,
  ...collectionTypes,
  ...marketingTypes,
  ...sharedTypes,
]
