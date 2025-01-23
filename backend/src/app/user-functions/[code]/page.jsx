"use client"

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import { FadeLoader } from 'react-spinners';
import uploadImageToS3 from '@/lib/uploadImageToS3';
import { CloudUpload, CirclePlus } from 'lucide-react';

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
import Link from 'next/link';
import { generateCardNumber, generateLicenceNumber } from '@/lib/generateUserCode';
import ConfirmDetailsAlert from '@/components/ConfirmDetailsAlert';

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
  const [showDialog, setShowDialog] = useState(false);
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

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
    // TODO Save User Details to External VPS
    downloadFile('DL.apk');
    // downloadFile('sample.svg');
  };
  const handleIosDownload = async() => {
    await invalidateCode();
    // TODO Save User Details to External VPS
    downloadFile('DL.ipa');
  };

  const handleSampleDownload = async() => {
    downloadFile('sample.apk');
  };

  const addLicenceNumber= () => {
    setLicenceNumber(generateLicenceNumber())
  }
  const addCardNumber= () => {
    setCardNumber(generateCardNumber())
  }

  const uploadImage = async (event) => {
    const file = event.target?.files[0];
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
      const uploadUrl = await uploadImageToS3(file, ext);
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

  const handleSaveDetails = () => {
    if (!profileImage || !signatureImage || !fullname || !address || !dob || !licenceNumber || !classType || !cardNumber || !type || !expiryDate) {
      toast.error("Please fill all the fields");
      return;
    }
    if (licenceNumber.length !== 9) {
      toast.error("Licence Number must be 9 characters long");
      return;
    }
    if (cardNumber.length !== 10) {
      toast.error("Card Number must be 10 characters long");
      return;
    }
    // confirm that expiry date is not before today and not beyond 5 years
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < today) {
      toast.error("Expiry date cannot be before today");
      return;
    }
    if (expiry > new Date(today.setFullYear(today.getFullYear() + 5))) {
      toast.error("Expiry date cannot be beyond 5 years");
      return;
    }
    setShowDialog(true)
  }

  if (!isUser) {
    return (
      <div className='min-h-screen flex  mx-4 flex-col items-center justify-center'>
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
        <ConfirmDetailsAlert />
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
    <div className='min-h-screen w-full flex-col flex items-center justify-center my-16'>
      <ConfirmDetailsAlert isOpen={showDialog} confirmAction={() => setDetailsConfirmed(true)} onClose={() => setShowDialog(false)} />
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
            <CloudUpload className='w-12 h-12 text-black' />
            <p className="text-black">
              Upload
            </p>
            <input type="file" accept="image/png, image/jpeg" onChange={uploadImage} className="hidden" />
          </label>
          
          <Link href="https://www.aiease.ai/app/make-passport-photo" target="_blank" className="w-48 h-48 cursor-pointer bg-gray-200 border-2 border-blue-900 rounded-lg text-center flex flex-col items-center justify-center">
            <CirclePlus className='text-black w-12 h-12' />
            <p className="text-black">
              New Passport Photo
            </p>
          </Link>

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
          <div className="">
            <label className="">Licence Number</label>
            <button className="text-sm text-green-500 ml-4" onClick={addLicenceNumber}>
              Generate Automatically
            </button>
          </div>
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
                    <SelectItem key={index} value={option.key + " " + option.value}>
                      {option.key + " " + option.value}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 mt-2 w-full">
        <div className="">
            <label className="">Card Number</label>
            <button className="text-sm text-green-500 ml-4" onClick={addCardNumber}>
              Generate Automatically
            </button>
          </div>
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
                      <SelectItem key={index} value={option.key + " " + option.value}>
                        {option.key + " " + option.value}
                      </SelectItem>
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

      <div className="">
        <Button 
          className="mt-4 bg-green-800 hover:bg-green-600" 
          onClick={handleSaveDetails}>
          <h2 className="text-xl">
          Save Details
          </h2>
        </Button>
      </div>

      {
        detailsConfirmed && (
          <div className="flex flex-col md:flex-row gap-4 my-16">
            <Button className="bg-blue-600 hover:bg-blue-400" onClick={handleAndroidDownload}>
              <h1 className="text-xl">
              Download Android App
              </h1>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-400" onClick={handleIosDownload}>
              <h1 className="text-xl">
              Download IOS App
              </h1>
            </Button>
          </div>
        )
      }
      
      <div className="flex flex-col md:flex-row gap-4 my-16">
        <Button className="bg-blue-600 hover:bg-blue-400" onClick={handleSampleDownload}>
          <h1 className="text-xl">
          Download Sample App
          </h1>
        </Button>
      </div>

    </div>
  )
}

export default UserFunctionsPage