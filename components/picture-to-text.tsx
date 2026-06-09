'use client'

import { Button } from '@/components/ui/button'
import { Copy, Download, Loader, RotateCcw, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import Tesseract from 'tesseract.js'

interface TextResult {
  filename: string
  text: string
  confidence: number
}

export function PictureToText() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState<TextResult[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const extractTextFromImage = async (file: File) => {
    setIsProcessing(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        
        const result = await Tesseract.recognize(imageData, 'eng', {
          logger: (m) => {
            console.log('[v0] OCR Progress:', m.progress)
          }
        })

        setResults((prev) => [
          ...prev,
          {
            filename: file.name,
            text: result.data.text,
            confidence: result.data.confidence
          }
        ])
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('[v0] OCR Error:', error)
      alert('Error extracting text. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        extractTextFromImage(file)
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Text copied to clipboard!')
  }

  const downloadAsText = (filename: string, text: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename.replace(/\.[^/.]+$/, '') + '.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const resetAll = () => {
    setResults([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  if (results.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Result ({results.length})</h1>
            <Button
              onClick={resetAll}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Start Again
            </Button>
          </div>

          <div className="space-y-6">
            {results.map((result, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{result.filename}</h3>
                    <p className="text-sm text-gray-500">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(result.text)}
                      variant="outline"
                      size="sm"
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => downloadAsText(result.filename, result.text)}
                      variant="outline"
                      size="sm"
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto">
                  <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                    {result.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            *Your privacy is protected! No data is transmitted or stored.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Picture to Text Converter</h1>
          <p className="text-gray-600">Extract text from images using advanced OCR technology</p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive ? 'border-accent bg-accent/5' : 'border-gray-300'
          }`}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your images here, or click to select files
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-accent hover:bg-accent/90 text-white"
          >
            Choose Images
          </Button>
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Supported Features:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Multiple language support (optimized for English)</li>
            <li>✓ Batch processing of multiple images</li>
            <li>✓ High accuracy OCR technology</li>
            <li>✓ Copy extracted text to clipboard</li>
            <li>✓ Download results as text files</li>
          </ul>
        </div>

        {isProcessing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
              <Loader className="w-8 h-8 text-accent animate-spin" />
              <p className="text-lg font-semibold">Extracting text...</p>
              <p className="text-sm text-gray-600">This may take a moment</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
