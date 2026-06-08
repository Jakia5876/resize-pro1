'use client'

import { Button } from '@/components/ui/button'
import { resizeImage, getImageDimensions, downloadImage, sanitizeFilename } from '@/lib/image-utils'
import { X, Loader, Download } from 'lucide-react'
import { useCallback, useState, useEffect } from 'react'

interface ImageFile {
  original: File
  preview: string
  width: number
  height: number
  resized?: Blob
  isProcessing?: boolean
}

interface ResizeEditorClientProps {
  files: File[]
}

export function ResizeEditorClient({ files }: ResizeEditorClientProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [resizeWidth, setResizeWidth] = useState(300)
  const [resizeHeight, setResizeHeight] = useState(300)
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg')
  const [quality, setQuality] = useState(85)
  const [aspectRatio, setAspectRatio] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load images on mount or when files change
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true)
      const newImages: ImageFile[] = []

      for (const file of files) {
        try {
          const dims = await getImageDimensions(file)
          newImages.push({
            original: file,
            preview: URL.createObjectURL(file),
            width: dims.width,
            height: dims.height,
          })
        } catch (error) {
          console.error('[v0] Failed to load image:', error)
        }
      }

      setImages(newImages)
      setIsLoading(false)
    }

    if (files.length > 0) {
      loadImages()
    }
  }, [files])

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }, [])

  const handleHeightChange = (value: number) => {
    setResizeHeight(value)
    if (aspectRatio && images.length > 0) {
      const ratio = images[0].width / images[0].height
      setResizeWidth(Math.round(value * ratio))
    }
  }

  const handleWidthChange = (value: number) => {
    setResizeWidth(value)
    if (aspectRatio && images.length > 0) {
      const ratio = images[0].height / images[0].width
      setResizeHeight(Math.round(value * ratio))
    }
  }

  const processImages = useCallback(async () => {
    setIsProcessing(true)
    try {
      const processedImages = await Promise.all(
        images.map(async (img, idx) => {
          try {
            const resized = await resizeImage(img.original, {
              width: resizeWidth,
              height: resizeHeight,
              quality,
              format,
            })
            return { ...img, resized }
          } catch (error) {
            console.error('[v0] Failed to resize image:', error)
            return img
          }
        })
      )
      setImages(processedImages)
    } finally {
      setIsProcessing(false)
    }
  }, [images, resizeWidth, resizeHeight, quality, format])

  const downloadAll = useCallback(() => {
    images.forEach((img, idx) => {
      if (img.resized) {
        const newName = sanitizeFilename(img.original.name, idx)
        downloadImage(img.resized, newName)
      }
    })
  }, [images])

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8 bg-card rounded-lg border border-border">
          <Loader className="w-6 h-6 text-accent animate-spin mr-3" />
          <p className="text-muted-foreground">Loading images...</p>
        </div>
      )}

      {!isLoading && (
        <>
      {/* Settings Panel */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-6">Resize Settings</h3>

        {/* Quick Presets */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-sm font-medium mb-3">Quick Presets</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Square 300x300', w: 300, h: 300 },
              { label: 'Thumbnail 150x150', w: 150, h: 150 },
              { label: 'Social 1200x627', w: 1200, h: 627 },
              { label: 'Instagram 1080x1080', w: 1080, h: 1080 },
              { label: 'Portrait 1080x1350', w: 1080, h: 1350 }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setResizeWidth(preset.w)
                  setResizeHeight(preset.h)
                }}
                className="px-3 py-1.5 text-sm rounded bg-accent/10 border border-accent text-accent hover:bg-accent/20 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium mb-2">Width (px)</label>
            <input
              type="number"
              value={resizeWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
              min="10"
              max="4000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height (px)</label>
            <input
              type="number"
              value={resizeHeight}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
              min="10"
              max="4000"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full px-3 py-2 rounded bg-background border border-border text-foreground"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Quality: {quality}%
            </label>
            <input
              type="range"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              min="10"
              max="100"
              step="5"
              className="w-full"
            />
          </div>
        </div>

        {/* Aspect Ratio */}
        <label className="flex items-center gap-2 mt-6 cursor-pointer">
          <input
            type="checkbox"
            checked={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-medium">Maintain aspect ratio</span>
        </label>
      </div>

      {/* Image Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {images.length} image{images.length !== 1 ? 's' : ''} selected
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded-lg overflow-hidden border border-border bg-background/50"
            >
              <img
                src={img.preview}
                alt="Preview"
                className="w-full h-32 object-cover"
              />

              {img.resized && (
                <div className="absolute inset-0 bg-accent/30 flex items-center justify-center">
                  <span className="text-xs font-semibold text-accent-foreground">
                    ✓ Resized
                  </span>
                </div>
              )}

              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1 rounded bg-destructive/80 hover:bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 text-center">
                {img.width}×{img.height}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={processImages}
          disabled={isProcessing}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isProcessing && <Loader className="w-4 h-4 mr-2 animate-spin" />}
          {isProcessing ? 'Processing...' : 'Resize All'}
        </Button>

        <Button
          onClick={downloadAll}
          disabled={isProcessing || !images.some((img) => img.resized)}
          className="flex-1 bg-secondary hover:bg-secondary/90"
        >
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>
        </>
      )}
    </div>
  )
}
