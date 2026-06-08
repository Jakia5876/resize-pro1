'use client'

import { Button } from '@/components/ui/button'
import { UploadArea } from '@/components/upload-area'
import { ResizeEditorClient } from '@/components/resize-editor-client'
import { Image as ImageIcon, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AppPage() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Resize Pro</span>
            </button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-border hover:bg-card gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Batch Image Resizer</h1>
            <p className="text-muted-foreground">
              Upload multiple images and resize them all at once with custom dimensions
            </p>
          </div>

          {/* Upload or Editor */}
          {uploadedFiles.length === 0 ? (
            <UploadArea onFilesSelected={handleFilesSelected} />
          ) : (
            <>
              <ResizeEditorClient files={uploadedFiles} />
              <Button
                onClick={() => setUploadedFiles([])}
                variant="outline"
                className="border-border hover:bg-card"
              >
                Upload New Images
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
