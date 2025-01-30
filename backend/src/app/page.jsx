"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter()

  const handleProceed = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/codes/${code}`);
      console.log("Response: ", response.data)
      if (response.data.isAdmin && !response.data.isExpired) {
        router.push(`/admin-functions/${code}`)
      }
      if (response.data.isUser && !response.data.isExpired) {
        router.push(`/user-functions/${code}`)
      }
    } catch (error) {
      console.error('Invalid or Expired Code:', error);
      toast.error('Invalid or Expired Code');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    toast.info('Cancelled', {
      description: 'You have cancelled the operation.',
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Hello</CardTitle>
          <CardDescription>Welcome to our site</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label >Enter Your Code</Label>
                <Input 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  id="code" 
                  placeholder="Your Code"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className='bg-gray-500' onClick={handleCancel}>Cancel</Button>
          <Button className="bg-emerald-700" onClick={handleProceed}>
            {loading ? 'Loading...' : 'Proceed'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default HomeScreen                                                                