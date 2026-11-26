import {useFormValue, type ImageInputProps, type FileInputProps} from 'sanity'

export function CurrentMedia(props: ImageInputProps | FileInputProps) {
  const parent = useFormValue(props.path.slice(0, -1)) as Record<string, unknown> | undefined
  const bundled: Record<string, string> = {
    logo: '/logo.svg',
    universityLogo: '/umw-logo.svg',
    socialImage: '/images/meta/og_image.png',
  }
  const legacyKey: Record<string, string> = {
    file: 'legacyVideo',
    poster: 'legacyPoster',
    image: 'legacyImage',
  }
  const source =
    parent?.[legacyKey[String(props.path.at(-1))]] ?? bundled[String(props.path.at(-1))]
  const safe =
    typeof source === 'string' &&
    /^\/(?:images\/|research\/vitality\/|(?:umw-)?logo\.svg$)/.test(source) &&
    !/[?#\\]/.test(source) &&
    !source.includes('..')
  return (
    <div>
      {!props.value?.asset && safe && (
        <figure style={{margin: '0 0 12px'}}>
          {source.endsWith('.mp4') ? (
            <video controls preload="none" width="200" src={'https://pumadott.com' + source} />
          ) : (
            <img
              alt=""
              style={{maxWidth: 200, maxHeight: 120}}
              src={'https://pumadott.com' + source}
            />
          )}
          <figcaption>
            Current website file / Obecny plik. Upload below to replace it. Clearing a replacement
            restores this file.
          </figcaption>
        </figure>
      )}
      {props.renderDefault(props as ImageInputProps & FileInputProps)}
    </div>
  )
}
