'use client'

import { Button } from '@/components/ui/button'
import { InstructionsModal } from '@/components/instructions-modal'
import { ArrowRight, Image as ImageIcon, Zap, Download } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">Resize Pro</span>
            </div>
            <Button 
              onClick={() => router.push('/app')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Open Tool
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl sm:text-7xl font-bold mb-4 text-balance leading-tight tracking-tight">
            Resize Images <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">Instantly</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
            Batch resize, compress, and convert your images without uploading to any server. Everything runs in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-full px-8 py-6 h-auto transition-all hover:shadow-lg hover:shadow-accent/50"
              onClick={() => router.push('/app')}
            >
              Start Resizing <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <InstructionsModal />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Resize Pro?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Fast",
                description: "Process images instantly in your browser with no server overhead"
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Privacy First",
                description: "Your images never leave your device. No uploads, no tracking"
              },
              {
                icon: <ImageIcon className="w-6 h-6" />,
                title: "Batch Processing",
                description: "Resize multiple images at once and download them all together"
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-background border border-border hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded bg-accent/20 flex items-center justify-center text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to resize?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started in seconds. No signup required.
          </p>
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => router.push('/app')}
          >
            Open Tool <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 Resize Pro. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
