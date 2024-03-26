import axios from 'axios';
import CacheService from '../Cache/CacheService';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const handleCatch = (err, errorHandler=()=>null) => {
  errorHandler();

  let status = 500;
  let data = null;

  if(err.response){
    if(err.response.status)
      status = err.response.status;

    if(err.response.data)
      data = err.response.data;
  }

  let result = {status:status, data:data};

  console.log(result);

  return result;
}

const getJwt = async () => {
  let user = await CacheService.get('@user');

  if(user && user !== null)
    return user.token;

  return null;
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();

    let response = await axios.get(urlPath, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {  
  try{
    let jwt = await getJwt();
    
    let response = await axios.post(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();
    
    let response = await axios.delete(urlPath, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const put = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();
    
    let response = await axios.put(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

export {
  get,
  post,
  del,
  put,
}