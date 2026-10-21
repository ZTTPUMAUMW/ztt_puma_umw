import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website / Strona')
    .items([
      S.listItem()
        .id('research')
        .title('Research / Badania')
        .child(S.document().schemaType('researchPage').documentId('researchPage')),
      S.listItem()
        .id('chrome')
        .title('Navigation and branding')
        .child(S.document().schemaType('siteChrome').documentId('siteChrome')),
      ...['home', 'recruitment', 'cooperation'].map((name) =>
        S.listItem()
          .id(name)
          .title(
            (
              {
                home: 'Home / Strona główna',
                recruitment: 'Recruitment / Rekrutacja',
                cooperation: 'Cooperation / Współpraca',
              } as Record<string, string>
            )[name],
          )
          .child(
            S.document()
              .schemaType(name + 'Page')
              .documentId(name + 'Page'),
          ),
      ),
      S.listItem()
        .id('contact')
        .title('Contact / Kontakt')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      ...['team', 'projects', 'publications', 'models'].map((name) =>
        S.listItem()
          .id(name)
          .title(
            (
              {
                team: 'Team / Zespół',
                projects: 'Projects / Projekty',
                publications: 'Publications / Publikacje',
                models: 'Models / Modele',
              } as Record<string, string>
            )[name],
          )
          .child(
            S.document()
              .schemaType(name + 'Page')
              .documentId(name + 'Page'),
          ),
      ),
      S.divider(),
      S.listItem()
        .id('settings')
        .title('Site settings / Ustawienia strony')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
