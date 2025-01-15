"use client"
import { Button } from '@/components/ui/button'
import generateUserCode from '@/lib/generateUserCode'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from "moment"

const AdminFunctionsPage = ({params}) => {
  console.log("Params: ", params)
  const [userCode, setUserCode] = useState('');
  const [allCodes, setAllCodes] = useState([]);
  const [currentCodes, setCurrentCodes] = useState([]);
  const [activeBar, setActiveBar] = useState('All')

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

  return (
    <div className='min-h-screen flex flex-col items-center pt-8'>
      <div className="flex flex-row mb-8 gap-4 justify-between">
      <Button className='' onClick={generateAndSaveCode}>Generate Code</Button>
      <p className='text-xl font-bold'>User Code: {userCode}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-row gap-8">
          <Button onClick={fetchAllCodes} className={`font-bold text-2xl ${activeBar ==="All"? "bg-green-600 hover:bg-green-800": ""}`}>All Codes</Button>
          <Button onClick={getUserCodes} className={`font-bold text-2xl ${activeBar ==="Users"? "bg-green-600 hover:bg-green-800": ""}`}>All User Codes</Button>
          <Button onClick={getAdminCodes} className={`font-bold text-2xl ${activeBar ==="Admins"? "bg-green-600 hover:bg-green-800": ""}`}>All Admin Codes</Button>
        </div>
        <div className="flex flex-col gap-4">
          {currentCodes.map((code, index) => (
            <div className="flex flex-row gap-4" key={index}>
              <p className="text-xl">{code.codeText}</p>
              <p className="text-xl">{code.isUser ? "User" : "Admin"}</p>
              <p className="text-xl">{code.isExpired ? "Expired" : "Valid"}</p>
              <p className="text-xl">{moment(code.createdAt).format("DD MMM YYYY")}</p>
              <Button onClick={() => deleteCode(code._id)}>Delete</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminFunctionsPage