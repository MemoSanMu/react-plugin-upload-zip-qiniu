import { useState, useRef, useEffect } from 'react'

// 一、 useCountDown;

// 描述
// 1s 倒计时
// return [count, start];
// count 开始后1s更新 10, 9, 8 , 7
// 点击开始计时 1s 更新 count。到0停止计时，返回初始值。0点击后又开始计时。

function useCountDown(defaultVal: number) {
  const [count, setCount] = useState<number>(defaultVal)
  const refTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  function stop() {
    if (refTimer.current) {
      clearInterval(refTimer.current)
      refTimer.current = null
    }
  }

  function handleStart() {
    if (!refTimer.current) {
      refTimer.current = setInterval(() => {
        setCount((val: number) => {
          const newVal = val - 1
          if (newVal === 0) {
            stop()
            return defaultVal
          }
          return newVal
        })
      }, 1000)
    }
  }

  return [count, handleStart] as const
}

export { useCountDown }
// const [count, start] = useCountDown(10)
