import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'NOTIFICATION_KEY'

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if(status === 'granted') {
                            const time = getScheduleTime()
                            Notifications.cancelAllScheduledNotificationsAsync()
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time,
                                    repeat: 'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(time.toString()))
                        }
                    })
            } else {
                console.log('Notification already scheduled to be sent at: ' + data)
            }
        })
}

function getScheduleTime() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(19)
    tomorrow.setMinutes(30)
    return tomorrow
}

function createNotification() {
    return {
        title: 'Finish a quiz',
        body: 'You have\'t finished a quiz today. Don\'t forget to do it',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}