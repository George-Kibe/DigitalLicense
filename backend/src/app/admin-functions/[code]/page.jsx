"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import { Button } from '@/components/ui/button'
import generateUserCode from '@/lib/generateUserCode'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useParams } from "next/navigation"
import { Copy } from "lucide-react"

const AdminFunctionsPage = () => {
  const params = useParams();
  const code = params.code
  const [userCode, setUserCode] = useState('');
  const [allCodes, setAllCodes] = useState([]);
  const [currentCodes, setCurrentCodes] = useState([]);
  const [activeBar, setActiveBar] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAdminStatus = async(codeText) => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/codes/${codeText}`);
      console.log("Response: ", response.data)
      if (response.data.isAdmin && !response.data.isExpired) {
        setIsAdmin(true)
      }
    } catch (error) {
      console.error('Invalid or Expired Code:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    code && getAdminStatus(code)
  }, [code])
  

  const fetchAllCodes = async () => {
    const response = await axios.get('/api/codes')
    setAllCodes(response.data)
    setCurrentCodes(response.data)
  }
  useEffect(() => {
    fetchAllCodes()
  }, [])  

  const generateAndSaveCode = async () => {
    const code = generateUserCode(20);
    try {
      const response = await axios.post('/api/codes', {
        codeText: code,
        isUser: true
      })
      console.log("Data: ", response.data)
      setUserCode(response.data.codeText)
    } catch (error) {
      console.log("Error: ", error)
    } finally{
      fetchAllCodes()
    }
  }
  const deleteCode = async(codeId) => {
    console.log("Code ID: ", codeId)
    try {
      const response = await axios.delete(`/api/codes/${codeId}`)
      console.log("Delete response: ", response)
    } catch (error) {
      console.log("Error: ", error)
    } finally{
      fetchAllCodes()
    }
  }
  const getUserCodes = () => {
    const allUsers = allCodes.filter((code) => code.isUser);
    setCurrentCodes(allUsers);
    setActiveBar('Users')
  }
  const getAdminCodes = () => {
    const allAdmins = allCodes.filter((code) => !code.isUser);
    setCurrentCodes(allAdmins)
    setActiveBar('Admins')
  }
  const copyToClipBoard = async(text) => {
    await window.navigator.clipboard.writeText(text);
    toast.info("Code Copied!");
  }

  if (!isAdmin) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className="text-2xl mb-4">
          You do not have the necessary priveleges to view this page!
        </h1>
      </div>
    )
  }
  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div class="text-center">
          <div
            class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
          ></div>
          <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p class="text-zinc-600 dark:text-zinc-400">
            Your adventure is about to begin
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col items-center pt-8'>
      <div className="flex flex-row mb-8 gap-4 justify-between">
      <Button className='' onClick={generateAndSaveCode}>Generate Code</Button>
      <p className='text-xl font-bold'>User Code: {userCode}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-row gap-8">
          <Button onClick={getUserCodes} className={`font-bold text-xl ${activeBar ==="Users"? "bg-green-600 hover:bg-green-800": ""}`}>All User Codes</Button>
          <Button onClick={getAdminCodes} className={`font-bold text-xl ${activeBar ==="Admins"? "bg-green-600 hover:bg-green-800": ""}`}>All Admin Codes</Button>
        </div>
        <Table>
          <TableCaption>A list of your recent codes.</TableCaption>
          <TableHeader>
            <TableRow className=''>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className=''>Creation Date</TableHead>
              <TableHead className=''>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCodes.map((code, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex flex-row gap-2">
                  <p className="">{code.codeText}</p>
                  <Copy onClick={() => copyToClipBoard(code.codeText)} />
                </TableCell>
                <TableCell>
                  <p className="">{code.isUser ? "User" : "Admin"}</p>
                </TableCell>
                <TableCell>
                  <p className="">{code.isExpired ? "Expired" : "Valid"}</p>
                </TableCell>
                <TableCell>
                  <p className="">{moment(code.createdAt).format("DD MMM YYYY")}</p>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteCode(code._id)}>Delete</Button>
                </TableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminFunctionsPage