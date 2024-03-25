import axios from 'axios';
import CacheService from '../Cache/CacheService';
import { Texts } from '../../utils/Texts';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const get = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');

    let response = await axios.get(urlPath, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const post = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.post(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const del = async (urlPath, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.delete(urlPath, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

const put = async (urlPath, body={}, errorHandler=()=>null, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.put(urlPath, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    errorHandler();

    return {status:500}
  }
}

export {
  get,
  post,
  del,
  put,
}