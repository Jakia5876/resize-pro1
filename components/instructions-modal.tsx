'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useState } from 'react'

export function InstructionsModal() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button 
        size="lg"
        variant="outline"
        className="border border-border hover:bg-card/50 hover:border-accent/50 font-semibold rounded-full px-8 py-6 h-auto transition-all"
        onClick={() => setIsOpen(true)}
      >
        Learn More
      </Button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
            <h2 className="text-2xl font-bold">How to Use Resize Pro</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent/20 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-semibold">Upload Your Images</h3>
              </div>
              <p className="text-muted-foreground ml-11">
                Click &quot;Open Tool&quot; to access the resize editor. Drag and drop your images onto the upload area or click to browse your device. You can upload multiple images at once to process them in batch.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-semibold">Choose Your Resize Settings</h3>
              </div>
              <p className="text-muted-foreground ml-11">
                Select a quick preset (Square 300x300, Thumbnail 150x150, Social 1200x627, Instagram 1080x1080, or Portrait 1080x1350) or enter custom width and height values. Use the aspect ratio lock to maintain proportions automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="text-lg font-semibold">Select Format & Quality</h3>
              </div>
              <p className="text-muted-foreground ml-11">
                Choose your output format: JPEG (smallest file size), PNG (lossless), or WebP (modern format). Adjust the quality slider to balance file size and image quality. Higher quality means larger files.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <h3 className="text-lg font-semibold">Process & Download</h3>
              </div>
              <p className="text-muted-foreground ml-11">
                Click &quot;Resize All&quot; to process all your images. Once complete, you&apos;ll see a preview of each resized image. Download individual images or click &quot;Download All as ZIP&quot; to get everything at once.
              </p>
            </div>

            {/* Features */}
            <div className="pt-4 border-t border-border space-y-3">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="text-muted-foreground space-y-2 ml-4">
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Privacy:</strong> All processing happens in your browser - no server uploads</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Speed:</strong> Process multiple images instantly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Batch Processing:</strong> Handle dozens of images at once</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Multiple Formats:</strong> JPEG, PNG, and WebP support</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">•</span>
                  <span><strong>Easy Download:</strong> Get individual files or a ZIP archive</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="pt-4 border-t border-border space-y-3 bg-accent/5 p-4 rounded-lg">
              <h3 className="font-semibold">💡 Pro Tips:</h3>
              <ul className="text-muted-foreground space-y-2 ml-4 text-sm">
                <li>• Use JPEG for photographs (best compression)</li>
                <li>• Use PNG when transparency is needed</li>
                <li>• Use WebP for modern web projects (best compression + quality)</li>
                <li>• Quality 75-85 is ideal for most uses</li>
                <li>• Lock aspect ratio to prevent image distortion</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-6 flex gap-3 justify-end bg-card/50">
            <Button 
              variant="outline"
              className="border-border hover:bg-card"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              Got It, Let&apos;s Go!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
