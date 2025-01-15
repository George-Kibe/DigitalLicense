"use client"

import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import React from 'react'

const UserFunctionsPage = () => {
  const params = useParams();
  console.log("Params: ", params)
  return (
    <div className='min-h-screen flex-col flex items-center justify-center'>
      <h1 className="text-4xl mb-4">Download APP</h1>
      <div className="flex flex-row">
        <div className="flex gap-4 flex-row">
          <Button>Android</Button>
          <Button>IOS</Button>
        </div>
      </div>
    </div>
  )
}

export default UserFunctionsPage