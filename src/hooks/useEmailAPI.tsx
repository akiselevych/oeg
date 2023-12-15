import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { LoadingStatusType } from 'types/index';
import { instance } from 'services/API';


type HttpMethod = 'GET' | 'POST';

const useEmailAPI = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>('idle');
  const [response, setResponse] = useState<any | null>(null);
  const [isSucces, setIsSucces] = useState<boolean>(false);

  const resetSucces = () => setIsSucces(false)

  const requestFn = async (
    url: string,
    method: HttpMethod,
    body: any | null = null
  ) => {
    try {
      setLoadingStatus('loading');
      setIsSucces(false);
      setResponse(null);
      const options: any = {
        method,
        data: body,
      };


      const res: AxiosResponse<any> = await instance(url, options);


      setResponse(res.data);
      setLoadingStatus('idle');
      if (!!!res.data.error) {
        setIsSucces(true);
        setTimeout(resetSucces, 2000)
      }
    } catch (error) {
      console.error('Error:', error);
      setLoadingStatus('error');
      setIsSucces(false);
    }
  };

  return [requestFn, loadingStatus, response, isSucces] as const;
};

export default useEmailAPI