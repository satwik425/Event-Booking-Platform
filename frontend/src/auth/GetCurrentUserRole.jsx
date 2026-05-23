import React from 'react'
import { jwtDecode } from "jwt-decode";


const GetCurrentUserRole = () => {
    const token =document.cookie
    .split(";")
    .find((row)=> row.startsWith("token="))
    ?.split("=")[1];
 if(!token){
    return null;
 }
 try{
    const decoded =jwtDecode(token);
    console.log("decoded token:", decoded);
 return {  userId:decoded.userId.toString(),name: decoded.name,role: decoded.role };

 }catch(err){
    console.log("error decoding token",err);
 }
};

export default GetCurrentUserRole

