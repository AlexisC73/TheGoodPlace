import React from 'react'
import SuccessNotification from './SuccessNotification/SuccessNotification'
import ErrorNotification from './ErrorNotification/ErrorNotification'

export type NotificationProps = {
  title: string
  content: string
  type?: 'success' | 'error'
}

function Notification({ title, content, type = 'success' }: NotificationProps) {
  if (type === 'error') {
    return <ErrorNotification title={title} content={content} />
  }

  return <SuccessNotification title={title} content={content} />
}

export default Notification
