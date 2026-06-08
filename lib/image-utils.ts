import Pica from 'pica'

const pica = new Pica({ features: ['js', 'ww'] })

export interface ResizeOptions {
  width: number
  height: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
}

export async function resizeImage(
  file: File,
  options: ResizeOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (e) => {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'

        img.onload = async () => {
          const canvas = document.createElement('canvas')
          canvas.width = options.width
          canvas.height = options.height

          await pica.resize(img, canvas, {
            quality: 3,
          })

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Failed to create blob'))
              }
            },
            `image/${options.format || 'jpeg'}`,
            options.quality !== undefined ? options.quality / 100 : 0.85
          )
        }

        img.onerror = () => reject(new Error('Failed to load image'))
        img.src = e.target?.result as string
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

export async function downloadImage(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function downloadZip(files: { blob: Blob; name: string }[], zipName: string) {
  // For simplicity, we'll trigger individual downloads
  // In a production app, use JSZip library for actual ZIP creation
  for (const file of files) {
    await new Promise((resolve) => {
      setTimeout(() => {
        downloadImage(file.blob, file.name)
        resolve(null)
      }, 100)
    })
  }
}

export function sanitizeFilename(filename: string, index: number): string {
  const name = filename.replace(/\.[^/.]+$/, '')
  const ext = filename.split('.').pop()
  return `${name}-resized-${index}.${ext}`
}
