'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Image as ImageIcon, Minimize2, Palette, Layers, Sparkles, Wand2, Grid, FileText, Maximize2, Zap, Lock, RotateCw, Type, Combine, Split, File, FileJson, Shield, Stamp, Scan, DivideIcon, MessageSquare, Copy, CheckCircle, Languages } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')

  const tools = [
    {
      id: 'batch-resize',
      name: 'Batch Resize',
      description: 'Resize multiple images at once with custom dimensions',
      icon: <Maximize2 className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'resize',
      isNew: false
    },
    {
      id: 'compress',
      name: 'Compress Images',
      description: 'Reduce file size while maintaining image quality',
      icon: <Minimize2 className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'optimize',
      isNew: false
    },
    {
      id: 'format-convert',
      name: 'Format Converter',
      description: 'Convert between JPG, PNG, WebP, GIF and more',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'crop-resize',
      name: 'Crop & Resize',
      description: 'Crop specific areas and resize in one operation',
      icon: <Grid className="w-8 h-8" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'resize',
      isNew: false
    },
    {
      id: 'quality-adjust',
      name: 'Quality Adjust',
      description: 'Fine-tune compression quality and output settings',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      category: 'optimize',
      isNew: false
    },
    {
      id: 'batch-convert',
      name: 'Batch Convert',
      description: 'Convert and resize multiple images simultaneously',
      icon: <RotateCw className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'convert',
      isNew: true
    },
    {
      id: 'smart-resize',
      name: 'Smart Resize',
      description: 'AI-powered resizing with aspect ratio preservation',
      icon: <Wand2 className="w-8 h-8" />,
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      category: 'optimize',
      isNew: true
    },
    {
      id: 'preset-sizes',
      name: 'Preset Sizes',
      description: 'Quick resize to popular social media dimensions',
      icon: <Layers className="w-8 h-8" />,
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      category: 'resize',
      isNew: false
    },
    {
      id: 'watermark',
      name: 'Add Watermark',
      description: 'Protect your images with custom watermarks',
      icon: <Lock className="w-8 h-8" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'bulk-optimize',
      name: 'Bulk Optimize',
      description: 'Optimize entire folders of images with one click',
      icon: <Zap className="w-8 h-8" />,
      color: 'bg-lime-100',
      iconColor: 'text-lime-600',
      category: 'optimize',
      isNew: true
    },
    {
      id: 'picture-to-text',
      name: 'Picture to Text',
      description: 'Extract text from images using OCR technology',
      icon: <Type className="w-8 h-8" />,
      color: 'bg-teal-100',
      iconColor: 'text-teal-600',
      category: 'convert',
      isNew: true
    },
    {
      id: 'merge-pdf',
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into a single document',
      icon: <Combine className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'split-pdf',
      name: 'Split PDF',
      description: 'Separate pages or split PDF into multiple files',
      icon: <Split className="w-8 h-8" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'compress-pdf',
      name: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality',
      icon: <Minimize2 className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'optimize',
      isNew: false
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      description: 'Convert PDF documents to editable Word format',
      icon: <FileJson className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'pdf-to-ppt',
      name: 'PDF to PowerPoint',
      description: 'Convert PDF to editable PowerPoint presentations',
      icon: <Palette className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'pdf-to-excel',
      name: 'PDF to Excel',
      description: 'Extract data from PDF into Excel spreadsheets',
      icon: <Grid className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'word-to-pdf',
      name: 'Word to PDF',
      description: 'Convert Word documents to PDF format',
      icon: <File className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'ppt-to-pdf',
      name: 'PowerPoint to PDF',
      description: 'Convert presentations to PDF documents',
      icon: <File className="w-8 h-8" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'excel-to-pdf',
      name: 'Excel to PDF',
      description: 'Convert spreadsheets to PDF format',
      icon: <File className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'edit-pdf',
      name: 'Edit PDF',
      description: 'Add text, images, and shapes to PDF documents',
      icon: <Wand2 className="w-8 h-8" />,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'pdf-to-jpg',
      name: 'PDF to JPG',
      description: 'Convert PDF pages to JPG images',
      icon: <Image as ImageIcon className="w-8 h-8" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'jpg-to-pdf',
      name: 'JPG to PDF',
      description: 'Convert images to PDF documents',
      icon: <File className="w-8 h-8" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'sign-pdf',
      name: 'Sign PDF',
      description: 'Add digital signatures to PDF documents',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'watermark-pdf',
      name: 'Watermark PDF',
      description: 'Add watermarks to protect your PDFs',
      icon: <Stamp className="w-8 h-8" />,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'rotate-pdf',
      name: 'Rotate PDF',
      description: 'Rotate pages in your PDF documents',
      icon: <RotateCw className="w-8 h-8" />,
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'html-to-pdf',
      name: 'HTML to PDF',
      description: 'Convert web pages to PDF format',
      icon: <FileJson className="w-8 h-8" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'unlock-pdf',
      name: 'Unlock PDF',
      description: 'Remove password protection from PDFs',
      icon: <Lock className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'protect-pdf',
      name: 'Protect PDF',
      description: 'Add password protection to PDF documents',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'organize-pdf',
      name: 'Organize PDF',
      description: 'Rearrange, delete, or extract PDF pages',
      icon: <Layers className="w-8 h-8" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'repair-pdf',
      name: 'Repair PDF',
      description: 'Fix damaged or corrupted PDF files',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'optimize',
      isNew: false
    },
    {
      id: 'page-numbers',
      name: 'Page Numbers',
      description: 'Add page numbers to PDF documents',
      icon: <Copy className="w-8 h-8" />,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'scan-to-pdf',
      name: 'Scan to PDF',
      description: 'Convert scanned documents to searchable PDFs',
      icon: <Scan className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'ocr-pdf',
      name: 'OCR PDF',
      description: 'Extract text from scanned PDFs',
      icon: <Type className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'convert',
      isNew: false
    },
    {
      id: 'compare-pdf',
      name: 'Compare PDF',
      description: 'Highlight differences between PDF documents',
      icon: <DivideIcon className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'redact-pdf',
      name: 'Redact PDF',
      description: 'Permanently remove sensitive information',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'protect',
      isNew: false
    },
    {
      id: 'crop-pdf',
      name: 'Crop PDF',
      description: 'Crop pages in PDF documents',
      icon: <Grid className="w-8 h-8" />,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'edit',
      isNew: false
    },
    {
      id: 'pdf-forms',
      name: 'PDF Forms',
      description: 'Fill and sign PDF forms online',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'edit',
      isNew: true
    },
    {
      id: 'pdf-summarizer',
      name: 'AI Summarizer',
      description: 'Generate summaries of PDF content automatically',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      category: 'optimize',
      isNew: true
    },
    {
      id: 'translate-pdf',
      name: 'Translate PDF',
      description: 'Translate PDFs to multiple languages',
      icon: <Languages className="w-8 h-8" />,
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      category: 'convert',
      isNew: true
    }
  ]

  const categories = [
    { id: 'all', label: 'All Tools' },
    { id: 'resize', label: 'Resize' },
    { id: 'optimize', label: 'Optimize' },
    { id: 'convert', label: 'Convert' },
    { id: 'edit', label: 'Edit' },
    { id: 'protect', label: 'Protect' }
  ]

  const filteredTools = activeCategory === 'all' ? tools : tools.filter(tool => tool.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/a3m-logo.png"
                alt="A3M IT TECH Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-gray-900">A3M IT TECH</span>
                <span className="font-bold text-accent leading-tight" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '24px', fontWeight: 700 }}>Resize Pro</span>
              </div>
            </Link>
            <Button 
              onClick={() => router.push('/app')}
              className="bg-accent hover:bg-accent/90 text-white rounded-lg px-6"
            >
              Open Tool
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              Every tool you need to work with images in one place
            </h1>
            <p className="text-gray-600 text-lg">
              All the tools you need to resize, compress, convert, and optimize images. All 100% FREE and easy to use. Resize, compress, convert, rotate, unlock and watermark images with just a few clicks.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group"
                onClick={() => router.push(`/tools/${tool.id}`)}
              >
                {tool.isNew && (
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    New
                  </div>
                )}
                <div className={`${tool.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className={tool.iconColor}>
                    {tool.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">{tool.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>

          {/* Create Workflow Card */}
          <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200 p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create a workflow</h3>
            <p className="text-gray-600 mb-4">Combine multiple tools to automate your image processing tasks</p>
            <Link href="#" className="text-accent font-semibold hover:underline">
              Create workflow →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
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
                <span className="font-bold text-accent leading-tight" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '24px', fontWeight: 700 }}>Resize Pro</span>
              </div>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Support</Link>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 A3M IT TECH - Resize Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
