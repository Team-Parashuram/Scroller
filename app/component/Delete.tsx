'use client'

import { apiClient } from '@/lib/apiClient'
import { Trash2Icon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

interface DeleteButtonProps {
  id: string
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      await apiClient.deleteVideo(id)
      toast.success('Video deleted Successfully')
    } catch {
      toast.error('Failed to delete video')
    }
  }

  return (
    <div onClick={handleDelete}>
      <Trash2Icon />
    </div>
  )
}
