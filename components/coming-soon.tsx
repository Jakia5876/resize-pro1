'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ComingSoonProps {
  toolName: string
  description: string
  expectedDate?: string
}

export function ComingSoon({ toolName, description, expectedDate }: ComingSoonProps) {
  const router = useRouter()
  const [isNotified, setIsNotified] = useState(false)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {toolName} - Coming Soon
        </h2>

        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          {description}
        </p>

        {expectedDate && (
          <div className="bg-white rounded-lg p-4 mb-8 inline-block">
            <p className="text-gray-700">
              <span className="font-semibold">Expected Launch:</span> {expectedDate}
            </p>
          </div>
        )}

        <div className="bg-blue-100 rounded-lg p-6 mb-8">
          <p className="text-gray-700 mb-4">
            Get notified when this tool is released!
          </p>
          <Button
            onClick={() => setIsNotified(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Bell className="w-4 h-4 mr-2" />
            {isNotified ? 'Notification Added!' : 'Notify Me'}
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          We're working hard to bring you this feature. Check back soon for updates!
        </p>

        <div className="mt-12 pt-8 border-t border-gray-300">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </div>
      </div>
    </div>
  )
}
