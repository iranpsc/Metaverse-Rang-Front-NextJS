import axios, { AxiosResponse } from 'axios';
import { NextApiRequest } from 'next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosHelper = async <T>(
  url: string, 
  method = 'get', 
  data: any,
  req?: NextApiRequest 
): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let token;  
if (typeof window !== 'undefined') {  
  // CSR - get token from cookie  
  token = document.cookie.split('user=')[1];   
} else {
  if (req && req.headers.authorization) {
   // SSR - get token from request headers
   const bearerToken = req.headers.authorization.split('Bearer ')[1];
   token = decodeURIComponent(bearerToken);
  }  
}
  

  const headers = token 
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response: AxiosResponse<T> = await axiosInstance({
    method,
    url,
    data,
    headers
  });

  return response.data;
};

export default axiosHelper;