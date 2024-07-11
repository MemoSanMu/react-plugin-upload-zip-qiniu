import { useEffect, useState } from 'react'

const Sun = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(() => {
    console.log(1)
    return 0 // 您需要为 useState 的初始值函数返回一个值
  })

  useEffect(() => {
    console.log(2)
  }, [])

  return <div>子组件</div>
}

const Father = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(() => {
    console.log(3)
    return 0 // 您需要为 useState 的初始值函数返回一个值
  })

  useEffect(() => {
    console.log(4)
  }, [])

  return (
    <>
      <Sun />
      <div>父组件</div>
    </>
  )
}

export default Father
