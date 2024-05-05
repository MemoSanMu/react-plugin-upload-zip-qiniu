import { useEffect } from 'react'
import { getHome } from '../../servers'

function Index() {
  useEffect(() => {
    console.log('执行')
    getHome().then(res => {
      console.log(res, ' res')
    })
  }, [])
  return <div>this is index</div>
}

export default Index
