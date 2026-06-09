'use client'

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { UploadArea } from '@/components/upload-area'
import { ResizeEditorClient } from '@/components/resize-editor-client'
import { PictureToText } from '@/components/picture-to-text'
import { ComingSoon } from '@/components/coming-soon'

const toolDescriptions: Record<string, { name: string; description: string; type: 'image' | 'ocr' | 'pdf' }> = {
  // Image Tools - Working
  'batch-resize': {
    name: 'Batch Resize',
    description: 'Resize multiple images at once with custom dimensions and aspect ratio control',
    type: 'image'
  },
  'compress': {
    name: 'Compress Images',
    description: 'Reduce file size while maintaining image quality with adjustable compression levels',
    type: 'image'
  },
  'format-converter': {
    name: 'Format Converter',
    description: 'Convert images between JPG, PNG, WebP and other popular formats',
    type: 'image'
  },
  'crop-resize': {
    name: 'Crop & Resize',
    description: 'Crop images to exact dimensions and resize in one operation',
    type: 'image'
  },
  'quality-adjust': {
    name: 'Quality Adjust',
    description: 'Fine-tune compression quality for optimal file size and visual quality',
    type: 'image'
  },
  'batch-convert': {
    name: 'Batch Convert',
    description: 'Convert and resize multiple images simultaneously with batch processing',
    type: 'image'
  },
  'smart-resize': {
    name: 'Smart Resize',
    description: 'AI-powered intelligent image resizing that preserves important content',
    type: 'image'
  },
  'preset-sizes': {
    name: 'Preset Sizes',
    description: 'Quickly resize to popular social media dimensions',
    type: 'image'
  },
  'add-watermark': {
    name: 'Add Watermark',
    description: 'Protect your images by adding custom watermarks',
    type: 'image'
  },
  'bulk-optimize': {
    name: 'Bulk Optimize',
    description: 'Optimize entire folders of images with one click',
    type: 'image'
  },
  // OCR Tools - Working
  'picture-to-text': {
    name: 'Picture to Text',
    description: 'Extract text from images using OCR technology',
    type: 'ocr'
  },
  // PDF Tools - Coming Soon
  'merge-pdf': {
    name: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single file',
    type: 'pdf'
  },
  'split-pdf': {
    name: 'Split PDF',
    description: 'Separate pages or split PDF documents into multiple files',
    type: 'pdf'
  },
  'compress-pdf': {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    type: 'pdf'
  },
  'pdf-to-word': {
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word format',
    type: 'pdf'
  },
  'pdf-to-ppt': {
    name: 'PDF to PowerPoint',
    description: 'Convert PDF to editable PowerPoint presentations',
    type: 'pdf'
  },
  'pdf-to-excel': {
    name: 'PDF to Excel',
    description: 'Extract data from PDF into Excel spreadsheets',
    type: 'pdf'
  },
  'word-to-pdf': {
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    type: 'pdf'
  },
  'ppt-to-pdf': {
    name: 'PowerPoint to PDF',
    description: 'Convert presentations to PDF documents',
    type: 'pdf'
  },
  'excel-to-pdf': {
    name: 'Excel to PDF',
    description: 'Convert spreadsheets to PDF format',
    type: 'pdf'
  },
  'edit-pdf': {
    name: 'Edit PDF',
    description: 'Add text, images, and shapes to PDF documents',
    type: 'pdf'
  },
  'pdf-to-jpg': {
    name: 'PDF to JPG',
    description: 'Convert PDF pages to JPG images',
    type: 'pdf'
  },
  'jpg-to-pdf': {
    name: 'JPG to PDF',
    description: 'Convert images to PDF documents',
    type: 'pdf'
  },
  'sign-pdf': {
    name: 'Sign PDF',
    description: 'Add digital signatures to PDF documents',
    type: 'pdf'
  },
  'watermark-pdf': {
    name: 'Watermark PDF',
    description: 'Add watermarks to protect your PDFs',
    type: 'pdf'
  },
  'rotate-pdf': {
    name: 'Rotate PDF',
    description: 'Rotate pages in your PDF documents',
    type: 'pdf'
  },
  'html-to-pdf': {
    name: 'HTML to PDF',
    description: 'Convert web pages to PDF format',
    type: 'pdf'
  },
  'unlock-pdf': {
    name: 'Unlock PDF',
    description: 'Remove password protection from PDFs',
    type: 'pdf'
  },
  'protect-pdf': {
    name: 'Protect PDF',
    description: 'Add password protection to PDF documents',
    type: 'pdf'
  },
  'organize-pdf': {
    name: 'Organize PDF',
    description: 'Rearrange, delete, or extract PDF pages',
    type: 'pdf'
  },
  'repair-pdf': {
    name: 'Repair PDF',
    description: 'Fix damaged or corrupted PDF files',
    type: 'pdf'
  },
  'page-numbers': {
    name: 'Page Numbers',
    description: 'Add page numbers to PDF documents',
    type: 'pdf'
  },
  'scan-to-pdf': {
    name: 'Scan to PDF',
    description: 'Convert scanned documents to searchable PDFs',
    type: 'pdf'
  },
  'ocr-pdf': {
    name: 'OCR PDF',
    description: 'Extract text from scanned PDFs',
    type: 'pdf'
  },
  'compare-pdf': {
    name: 'Compare PDF',
    description: 'Highlight differences between PDF documents',
    type: 'pdf'
  },
  'redact-pdf': {
    name: 'Redact PDF',
    description: 'Permanently remove sensitive information',
    type: 'pdf'
  },
  'crop-pdf': {
    name: 'Crop PDF',
    description: 'Crop pages in PDF documents',
    type: 'pdf'
  },
  'pdf-forms': {
    name: 'PDF Forms',
    description: 'Fill and sign PDF forms online',
    type: 'pdf'
  },
  'pdf-summarizer': {
    name: 'AI Summarizer',
    description: 'Generate summaries of PDF content automatically',
    type: 'pdf'
  },
  'translate-pdf': {
    name: 'Translate PDF',
    description: 'Translate PDFs to multiple languages',
    type: 'pdf'
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
        {tool.type === 'ocr' ? (
          <PictureToText />
        ) : tool.type === 'pdf' ? (
          <ComingSoon 
            toolName={tool.name}
            description={tool.description}
            expectedDate="Q2 2026"
          />
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
