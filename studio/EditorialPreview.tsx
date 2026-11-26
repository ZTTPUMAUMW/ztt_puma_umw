import {useState} from 'react'
import {useClient} from 'sanity'
import {createPreviewSecret} from '@sanity/preview-url-secret/create-secret'
import {dataset} from './env'

const pages: Record<string, [string, string]> = {
  homePage: ['/', '/en'],
  siteChrome: ['/', '/en'],
  siteSettings: ['/kontakt', '/en/contact'],
  contactPage: ['/kontakt', '/en/contact'],
  teamPage: ['/zespol', '/en/team'],
  modelsPage: ['/modele', '/en/models'],
  researchPage: ['/badania', '/en/research'],
  projectsPage: ['/projekty', '/en/projects'],
  publicationsPage: ['/publikacje', '/en/publications'],
  recruitmentPage: ['/rekrutacja', '/en/recruitment'],
  cooperationPage: ['/wspolpraca', '/en/cooperation'],
}
export default function EditorialPreview({schemaType}: {schemaType: {name: string}}) {
  const client = useClient({apiVersion: '2025-12-02'})
  const [error, setError] = useState('')
  async function open(path: string) {
    const tab = window.open('about:blank', '_blank')
    if (!tab) {
      setError('Allow pop-ups for Studio, then try again.')
      return
    }
    tab.opener = null
    try {
      const origin =
        dataset === 'production' ? 'https://pumadott.com' : process.env.SANITY_STUDIO_PREVIEW_ORIGIN
      if (!origin) throw Error('Configure the development review URL in the Studio build.')
      const url = new URL('/api/editorial/enter', origin)
      if (url.protocol !== 'https:' && url.hostname !== 'localhost')
        throw Error('Invalid preview origin.')
      const {secret} = await createPreviewSecret(client, 'PUMA Studio', window.location.href)
      url.searchParams.set('sanity-preview-secret', secret)
      url.searchParams.set('sanity-preview-pathname', path)
      tab.location.replace(url.href)
      setError('')
    } catch {
      tab.close()
      setError('Preview unavailable. Check your Studio account and the preview configuration.')
    }
  }
  const [pl, en] = pages[schemaType.name] || pages.homePage
  return (
    <section style={{padding: 24}}>
      <p>
        Open the saved draft in a new tab. Refresh after editing. Publish from the editor when
        ready.
      </p>
      <button onClick={() => open(pl)}>Podgląd PL</button>{' '}
      <button onClick={() => open(en)}>Preview EN</button>
      {error && <p role="alert">{error}</p>}
    </section>
  )
}
