"use client"

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { FadeLoader } from 'react-spinners';
import uploadImageToS3 from '@/lib/uploadImageToS3';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
import { removeBackground } from '@/lib/removebg';
 

const UserFunctionsPage = () => {
  const params = useParams();
  const code = params.code;
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // user details states
  const [profileImage, setProfileImage] = useState('');
  const [signatureImage, setSignatureImage] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState();
  const [licenceNumber, setLicenceNumber] = useState('')
  const [classType, setClassType] = useState('');
  const [cardNumber,  setCardNumber] = useState('');
  const [type, setType] = useState('');
  const [expiryDate, setExpiryDate] = useState();

  console.log(
    "ProfileImage: ", profileImage,
    "SignatureImage: ", signatureImage,
    "Fullname: ", fullname,
    "Address: ", address,
    "DOB: ", dob,
    "LicenceNumber: ", licenceNumber,
    "ClassType: ", classType,
    "CardNumber: ", cardNumber,
    "Type: ", type,
    "ExpiryDate: ", expiryDate
  )
  const typeOptions = [
    {"key":"(O)", "value": "Open"},
    {"key":"(P)", "value": "P-Red"},
    {"key":"(P)", "value": "P-Green"},
    {"key":"(L)", "value": "Learner"}
  ]
  const classOptions = [ 
    {"key":"(C)", "value": "Car"},
    {"key":"(M)", "value": "Motorcycle"},
    {"key":"(T)", "value": "Truck"},
  ]

  
  const getUserStatus = async(codeText) => {
    setLoading(true)
    try {
      const response = await axios.get(`/api/codes/${codeText}`);
      if (response.data.isUser && !response.data.isExpired) {
        setIsUser(true)
        setUserCode(response.data)
      }
    } catch (error) {
      console.error('Invalid or Expired Code:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    code && getUserStatus(code)
  }, [code])

  function downloadFile(fileName) {
    // Construct the file URL from the public folder
    const fileUrl = `/files/${fileName}`;  
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = fileUrl;  
    // Set the download attribute with the file name
    anchor.download = fileName;  
    // Append the anchor to the document and trigger the click
    document.body.appendChild(anchor);
    anchor.click();  
    // Remove the anchor element after the download starts
    document.body.removeChild(anchor);
  }

  const invalidateCode = async() => {
    setLoading(true)
    try {
      const response = await axios.put('/api/codes', {
        id: userCode._id,
        isUser: true,
        isExpired: true
      })
      console.log("Data: ", response.data)
    } catch (error) {
      console.log("Error: ", error)
    } finally{
      setLoading(false)
    }
  }
  
  const handleAndroidDownload = async() => {
    await invalidateCode();
    downloadFile('DL.apk');
    // downloadFile('sample.svg');
  };
  const handleIosDownload = async() => {
    await invalidateCode();
    downloadFile('DL.ipa');
  };

  const uploadImage = async (event) => {
    const file = event.target?.files[0];
    const newFile = removeBackground(file);
    if (!file) {
      toast.error("You have no image selected");
      return;
    }
  
    setIsUploading(true);
    toast.info("Uploading your Image");
  
    try {
      // Validate file extension
      const parts = file.name.split(".");
      const ext = parts[parts.length - 1].toLowerCase();
      if (!["png", "jpg", "jpeg"].includes(ext)) {
        toast.error(`Unsupported image format: ${ext}`);
        return;
      }
  
      // Upload to S3
      const uploadUrl = await uploadImageToS3(newFile, ext);
      if (!uploadUrl) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
      // Add the uploaded image URL to your state
      setProfileImage(uploadUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading your image. The file size may be too large.");
    } finally {
      setIsUploading(false);
    }
  };  

  if (!isUser) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className="text-2xl mb-4">
          You do not have the necessary priveleges to view this page!
        </h1>
        <h1 className="text-2xl mb-4">
          Your code is expired or already used!
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
    <div className='min-h-screen w-full flex-col flex items-center justify-center my-8'>
      <h1 className="text-4xl mb-4">Enter Your Details</h1>
      <div className=" md: w-[60%] items-center">
        <div className="items-center flex gap-4 justify-center">
          {
            profileImage && (
              <div className="w-48 h-48 border border-blue-900 rounded-lg relative">
                <Image src={profileImage} fill alt={'Profile Image'} className='rounded-md object-cover' />
                </div>
            )
          }
          {
            isUploading && <div className="h-48 w-48 flex border-2 border-blue-900 items-center justify-center rounded-lg"><FadeLoader /></div>
          }
          <label className="w-48 h-48 cursor-pointer bg-gray-200 border-2 border-blue-900 rounded-lg text-center flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            Upload
            <input type="file" accept="image/png, image/jpeg" onChange={uploadImage} className="hidden" />
          </label>
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Full Name</label>
          <Input className="w-full" type="full-name" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Address</label>
          <Input className="w-full" type="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Date of Birth</label>
          <Input className="w-full" type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Licence Number</label>
          <Input className="w-full" type="licence-number" placeholder="Licence Number" value={licenceNumber} onChange={(e) => setLicenceNumber(e.target.value)} />
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Class Type</label>
          <Select onValueChange={(value) => setClassType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="-Select-" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  classOptions.map((option, index) => (
                    <SelectItem key={index} value={option.key}>{option.value}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Card Number</label>
          <Input className="w-full" type="card-number" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Type</label>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="-Select-" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    typeOptions.map((option, index) => (
                      <SelectItem key={index} value={option.key}>{option.value}</SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        <div className="flex-1 mt-2 w-full">
          <label className="">Expiry Date</label>
          <Input className="w-full" type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
      </div>

      <h1 className="text-4xl mb-4">Download APP</h1>
      <div className="flex flex-row">
        <div className="flex gap-4 flex-row">
          <Button onClick={handleAndroidDownload}>Android</Button>
          <Button onClick={handleIosDownload}>IOS</Button>
        </div>
      </div>
    </div>
  )
}

export default UserFunctionsPage