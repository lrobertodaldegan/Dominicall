import axios from 'axios';
import CacheService from '../Cache/CacheService';
import { Texts } from '../../utils/Texts';

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
  let user = await CacheService.get(Texts.Cache.user);

  if(user && user !== null)
    return user.token;

  return null;
}

const getGroupId = async () => {
  let group = await CacheService.get(Texts.Cache.group);

  return group && group!== null && group._id ? group._id : '';
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();
    let gId = await getGroupId();

    let url = urlPath;

    if(url.includes('?'))
      url += `&t=${new Date().getTime()}`
    else
      url += `?t=${new Date().getTime()}`

    let response = await axios.get(url, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt, 'Group':gId}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {  
  try{
    let jwt = await getJwt();
    let gId = await getGroupId();
    
    let response = await axios.post(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt, 'Group':gId}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();
    let gId = await getGroupId();
    
    let response = await axios.delete(urlPath, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt, 'Group':gId}
    });

    return response;
  }catch(err){
    return handleCatch(err, errorHandler);
  }
}

const put = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await getJwt();
    let gId = await getGroupId();
    
    let response = await axios.put(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt, 'Group':gId}
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