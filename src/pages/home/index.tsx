import { useEffect } from 'react'
// import { getHome } from '../../servers'
import { useCountDown } from '../../hooks/useCountDown'

function Index() {
  const [count, start] = useCountDown(10)
  useEffect(() => {
    console.log('执行')
    // getHome().then(res => {
    //   console.log(res, ' res')
    // })
  }, [])
  const handleStart = () => {
    start()
  }
  return (
    <div>
      <h3>this is index {count}</h3>
      <button onClick={handleStart}>click</button>
    </div>
  )
}

export default Index
