'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { UploadArea } from '@/components/upload-area'
import { ResizeEditorClient } from '@/components/resize-editor-client'
import { PictureToText } from '@/components/picture-to-text'

const toolDescriptions: Record<string, { name: string; description: string }> = {
  'batch-resize': {
    name: 'Batch Resize',
    description: 'Resize multiple images at once with custom dimensions and aspect ratio control'
  },
  'compress': {
    name: 'Compress Images',
    description: 'Reduce file size while maintaining image quality with adjustable compression levels'
  },
  'format-converter': {
    name: 'Format Converter',
    description: 'Convert images between JPG, PNG, WebP and other popular formats'
  },
  'crop-resize': {
    name: 'Crop & Resize',
    description: 'Crop images to exact dimensions and resize in one operation'
  },
  'quality-adjust': {
    name: 'Quality Adjust',
    description: 'Fine-tune compression quality for optimal file size and visual quality'
  },
  'batch-convert': {
    name: 'Batch Convert',
    description: 'Convert and resize multiple images simultaneously with batch processing'
  },
  'smart-resize': {
    name: 'Smart Resize',
    description: 'AI-powered intelligent image resizing that preserves important content'
  },
  'preset-sizes': {
    name: 'Preset Sizes',
    description: 'Quickly resize to popular social media dimensions'
  },
  'watermark': {
    name: 'Add Watermark',
    description: 'Protect your images by adding custom watermarks'
  },
  'bulk-optimize': {
    name: 'Bulk Optimize',
    description: 'Optimize entire folders of images with one click'
  },
  'picture-to-text': {
    name: 'Picture to Text',
    description: 'Extract text from images using OCR technology'
  }
}

export default function ToolPage() {
  const params = useParams()
  const router = useRouter()
  const toolId = params.id as string
  const tool = toolDescriptions[toolId] || { name: 'Tool', description: 'Image tool' }
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <Image
                src="/a3m-logo.png"
                alt="A3M IT TECH Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-gray-900">A3M IT TECH</span>
                <span className="font-bold text-accent leading-tight" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '14px', fontWeight: 700 }}>Resize Pro</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Tool Header */}
      <section className="bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-gray-600 text-lg">{tool.description}</p>
        </div>
      </section>

      {/* Tool Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        {toolId === 'picture-to-text' ? (
          <PictureToText />
        ) : (
          <div className="mx-auto max-w-4xl">
            {uploadedFiles.length === 0 ? (
              <UploadArea onFilesSelected={handleFilesSelected} />
            ) : (
              <>
                <ResizeEditorClient files={uploadedFiles} />
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => setUploadedFiles([])}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Upload New Files
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
