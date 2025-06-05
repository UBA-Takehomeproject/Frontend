import { AppBar } from '@/components/custom-ui/appbar'
import { Outlet } from 'react-router-dom'

export default function MinimalLayout() {
  return (
    <div>
      <AppBar/>
      <Outlet/>
    </div>
  )
}
