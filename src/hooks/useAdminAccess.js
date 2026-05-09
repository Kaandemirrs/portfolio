import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hasAdminAccess, syncAdminAccessFromSearch } from '@/lib/projectStorage'

export default function useAdminAccess() {
  const location = useLocation()
  const [isAdmin, setIsAdmin] = useState(() => hasAdminAccess())

  useEffect(() => {
    setIsAdmin(syncAdminAccessFromSearch(location.search))
  }, [location.search])

  return isAdmin
}
