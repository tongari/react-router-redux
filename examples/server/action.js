export const API_SUCCESS = Symbol();
export const API_FAIL = Symbol();
export const getApiDataSuccess = (apiData)=> ({ type : API_SUCCESS, apiData });
export const getApiDataFail = ()=> ({ type : API_FAIL });

