import { useState, useEffect } from 'preact/hooks'

export interface TimeRemaining {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const useTimer = (finalDate?: Date) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (finalDate) {
        const now = new Date()
        const difference = finalDate.getTime() - now.getTime()
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, '0')
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, '0')
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, '0')
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, '0')

        setTimeRemaining({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [finalDate])

  return timeRemaining
}

export default useTimer
