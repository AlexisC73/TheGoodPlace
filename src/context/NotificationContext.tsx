'use client'
import Notification, {
  NotificationProps,
} from '@/components/Notification/Notification'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

type NotificationParam = NotificationProps & { duration?: number }

const defaultPushFunction = (notification: NotificationParam) => {}

const defaultValue = {
  pushNotificationRef: { current: defaultPushFunction },
}

const NotificationContext = createContext(defaultValue)

export function NotificationContextProvider({ children }: PropsWithChildren) {
  const pushNotificationRef = useRef(defaultPushFunction)
  return (
    <NotificationContext.Provider value={{ pushNotificationRef }}>
      <Notifications />
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const { pushNotificationRef } = useContext(NotificationContext)
  return {
    pushNotification: useCallback(
      (notification: NotificationParam) => {
        pushNotificationRef.current(notification)
      },
      [pushNotificationRef]
    ),
  }
}

function Notifications() {
  const [notifications, setNotifications] = useState<NotificationParam[]>([])

  const { pushNotificationRef } = useContext(NotificationContext)

  pushNotificationRef.current = ({
    duration,
    ...notification
  }: NotificationParam) => {
    setNotifications((notifications) => [...notifications, notification])

    if (duration) {
      setTimeout(() => {
        handleRemove(notification)
      }, duration * 1000)
    }
  }

  const handleRemove = (notification: NotificationParam) => {
    setNotifications((notifications) =>
      notifications.filter((n) => n !== notification)
    )
  }

  return (
    <ul className='z-40 flex flex-col gap-4 right-0 top-20 absolute'>
      {notifications.map((notification) => (
        <li key={notification.title} onClick={() => handleRemove(notification)}>
          <Notification {...notification} />
        </li>
      ))}
    </ul>
  )
}

export default Notifications
