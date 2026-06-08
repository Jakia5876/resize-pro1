'use client'

import { Upload } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function UploadArea({ onFilesSelected, disabled }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(!isDragActive)
    },
    [isDragActive]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/')
      )
      if (files.length > 0) {
        onFilesSelected(files)
      }
    },
    [onFilesSelected]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        onFilesSelected(files)
      }
    },
    [onFilesSelected]
  )

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed transition-all cursor-pointer ${
        isDragActive
          ? 'border-accent bg-accent/10'
          : 'border-border bg-card/50 hover:border-accent/50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
        aria-label="Upload images"
      />

      <div className="flex flex-col items-center justify-center p-12">
        <Upload className="w-12 h-12 text-accent mb-4" />
        <p className="text-lg font-semibold mb-2">Drag images here</p>
        <p className="text-muted-foreground text-sm">
          or click to browse your files
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Supported formats: JPG, PNG, WebP, GIF
        </p>
      </div>
    </div>
  )
}
