import axios from "axios";
const BASE_URL = process.env.BASE_URL

const loginApi = async (data) => {
  console.log('data',data)
    const response = await axios.post(`${BASE_URL}/api/version1/auth/login`,data);
    return response;
  };


  const getCustomerPurchaseHistory = async (id) => {
    try {
       const config =  {
          headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdkYzdiMGYyYTViYWJiYzU0NzM0ZGNlOGM5MWE3MGI1ZWIzZTE4NWFkYmU0YzE1MWMzOWE1MDhkODY4OTFhYjkyMGYzNTdmNGJiYzJlMTVkIn0.eyJhdWQiOiIxIiwianRpIjoiN2RjN2IwZjJhNWJhYmJjNTQ3MzRkY2U4YzkxYTcwYjVlYjNlMTg1YWRiZTRjMTUxYzM5YTUwOGQ4Njg5MWFiOTIwZjM1N2Y0YmJjMmUxNWQiLCJpYXQiOjE2NjAxMTA5ODMsIm5iZiI6MTY2MDExMDk4MywiZXhwIjoxNjkxNjQ2OTgzLCJzdWIiOiIxNTciLCJzY29wZXMiOltdfQ.UHR5R2XaJbdfRnOJ9WgMqDjpb4NKOc84079r4Cb7oFu0rBzy9PtEIJKmgb5Yrw25sTtceQ_jHAopWDnU30cZHKMQZERkwFJgx_pKiDs4OCX7tFZIvAwoOqAvkWRLMxXdSi156DaD44N2o9yIP9ICPV3RnXdcIXEFuLDTvRaD-0Md90XZx87jrR4ebZpeICfXaZZloRrCyiW_kwjGYAxw45aJNcpSvIzu4BkKRos1FizTWpTqvAoO2aszC2xQst8uySM4wdVE-rWZybkSQH7qovMIjVCMPHWtX_OUAa62OMwIWNW0LXJgKTBFM-YadMS478w5yr7HbOwzubOStkuvxq9aqvTI10w615b4dfR_m_FSPX1nAsmuA1G_ZEPRrfiKbdJDKeNzM4mQ36Af4mucCRRJpbw6hEX5KNn_krca7ZnkRSdis_TsaPPz4mztFZ_UReCJVC5NLKmNEqFsgnrkd7uIzbyy6QLrrdsyVdmrKHvUlAAAvtCVPDaNNeQ889wJFu-_rg79Kg7SYoa79B3gYCfKi6e-q4l7eKaZmgKiOyQ65k8PCF1MpzhTLn1-O1ZVeFa-_BsmRRYDobVcesvAOOsoSQkvFEq7Jj3Ry2ZdRHDrejeztxPLwR9SzkwkiDln1mRMOhXl_ceSp4E4LUWLKGe7iYqynhIOnRCoBVhHEBo "},
        }
       const response = await axios.get(`https://bme.com.bd/api/version1/purchase-history/${id}`, config);

    return response.data;
    } catch (error) {
      console.log(error)
      return []
    
    }
  };

  // const getCustomerPurchaseHistory = async (token) => {
  //   try {
  //      const config =  {
  //         headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhlN2EzZGM4MTU2YmY2YWVlNzg2OTIzMjg0YjA0ZDZiMGRkYTc0YjBjMzY0ZjIxNDM3YjYwNmZjZjUzOTMyZGI1MmFhMDZhZjFlYmQwZWRlIn0.eyJhdWQiOiIxIiwianRpIjoiOGU3YTNkYzgxNTZiZjZhZWU3ODY5MjMyODRiMDRkNmIwZGRhNzRiMGMzNjRmMjE0MzdiNjA2ZmNmNTM5MzJkYjUyYWEwNmFmMWViZDBlZGUiLCJpYXQiOjE2NjEyMzE2NzMsIm5iZiI6MTY2MTIzMTY3MywiZXhwIjoxNjkyNzY3NjczLCJzdWIiOiIxNTciLCJzY29wZXMiOltdfQ.bI8-PW3AHYiNiBCrko5qjoX6MwnBYOxD4gdF9zL0LwKUk6vjMsEEGca2Fogy_9-UlpaisCWfE4OOem32u4K7AHPXL1045ELakDTWHyy_EXxh5Mf957132CiTj_lbxhOdhu3ZOxDy6SzjAirSEkp7Ctsa1f2f5_V6nCIq0k9HQu5rlsbNAri9jF_qvJ3eG1GdhWZGjf1ekcnaJIcsE2CyOd--shghgfuyBEYOOPMqHav0raJAMA2BAxBJ2Fcr3TLVicsXG73hGuT7euFOKPWa8bdV14NhFtksBm-rWV44nkSCeAMebRJ_PMGfEjLqxC_XEqXSDIZ3jG818dI2RL85rhPldxj8MNOKo-Moai7z4j2HQLznok5xUvUK_ilCgrt7nzQJPjMOzLON6zizIwlIxDnGggFjOOZLtn8F29hnJmd3Je8zL6vI8fmMxuazw-d6Cu1bQAuA3Ph8EHLDFP7joumSrRra3wodOwZgfo0AQLZBmtZJFPBurtSSbbAEYoG097W3UUKBrEpPoV6zA0iMQSt2Cbq1AAV-q2IrpdH--9SYh_VV_kYY4iWChUZnhWt_r9dBTC4fhthvhG7j_AudCHmyodN8YpvM1VHSYnwGAPyaCxtei4kp5bDO6LyzlmYukAmy8lZhn8wPoWaA4hNmCZg4IBwvOpha_GCux8sHZtw"},
  //       }
  //      const response = await Axios.get(`${BASE_URL}/api/v1/customer-profile`, config);
  //      return response?.data;
  //   } catch (error) {
  //    // console.log(error)
  //     return null
    
  //   }
  // };

  const getCustomerProfile = async (token) => {
    try {
       const config =  {
          headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhlN2EzZGM4MTU2YmY2YWVlNzg2OTIzMjg0YjA0ZDZiMGRkYTc0YjBjMzY0ZjIxNDM3YjYwNmZjZjUzOTMyZGI1MmFhMDZhZjFlYmQwZWRlIn0.eyJhdWQiOiIxIiwianRpIjoiOGU3YTNkYzgxNTZiZjZhZWU3ODY5MjMyODRiMDRkNmIwZGRhNzRiMGMzNjRmMjE0MzdiNjA2ZmNmNTM5MzJkYjUyYWEwNmFmMWViZDBlZGUiLCJpYXQiOjE2NjEyMzE2NzMsIm5iZiI6MTY2MTIzMTY3MywiZXhwIjoxNjkyNzY3NjczLCJzdWIiOiIxNTciLCJzY29wZXMiOltdfQ.bI8-PW3AHYiNiBCrko5qjoX6MwnBYOxD4gdF9zL0LwKUk6vjMsEEGca2Fogy_9-UlpaisCWfE4OOem32u4K7AHPXL1045ELakDTWHyy_EXxh5Mf957132CiTj_lbxhOdhu3ZOxDy6SzjAirSEkp7Ctsa1f2f5_V6nCIq0k9HQu5rlsbNAri9jF_qvJ3eG1GdhWZGjf1ekcnaJIcsE2CyOd--shghgfuyBEYOOPMqHav0raJAMA2BAxBJ2Fcr3TLVicsXG73hGuT7euFOKPWa8bdV14NhFtksBm-rWV44nkSCeAMebRJ_PMGfEjLqxC_XEqXSDIZ3jG818dI2RL85rhPldxj8MNOKo-Moai7z4j2HQLznok5xUvUK_ilCgrt7nzQJPjMOzLON6zizIwlIxDnGggFjOOZLtn8F29hnJmd3Je8zL6vI8fmMxuazw-d6Cu1bQAuA3Ph8EHLDFP7joumSrRra3wodOwZgfo0AQLZBmtZJFPBurtSSbbAEYoG097W3UUKBrEpPoV6zA0iMQSt2Cbq1AAV-q2IrpdH--9SYh_VV_kYY4iWChUZnhWt_r9dBTC4fhthvhG7j_AudCHmyodN8YpvM1VHSYnwGAPyaCxtei4kp5bDO6LyzlmYukAmy8lZhn8wPoWaA4hNmCZg4IBwvOpha_GCux8sHZtw"},
        }
       const response = await axios.get(`${BASE_URL}/api/v1/v1/customer-profile`, config);
       return response?.data;
    } catch (error) {
     // console.log(error)
      return null
    
    }
  };
// <<<<<<< HEAD
  const updateCustomerProfile = async (data,token) => {
    // console.log(data)
    // try {
    //    const config =  {
    //       headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdkYzdiMGYyYTViYWJiYzU0NzM0ZGNlOGM5MWE3MGI1ZWIzZTE4NWFkYmU0YzE1MWMzOWE1MDhkODY4OTFhYjkyMGYzNTdmNGJiYzJlMTVkIn0.eyJhdWQiOiIxIiwianRpIjoiN2RjN2IwZjJhNWJhYmJjNTQ3MzRkY2U4YzkxYTcwYjVlYjNlMTg1YWRiZTRjMTUxYzM5YTUwOGQ4Njg5MWFiOTIwZjM1N2Y0YmJjMmUxNWQiLCJpYXQiOjE2NjAxMTA5ODMsIm5iZiI6MTY2MDExMDk4MywiZXhwIjoxNjkxNjQ2OTgzLCJzdWIiOiIxNTciLCJzY29wZXMiOltdfQ.UHR5R2XaJbdfRnOJ9WgMqDjpb4NKOc84079r4Cb7oFu0rBzy9PtEIJKmgb5Yrw25sTtceQ_jHAopWDnU30cZHKMQZERkwFJgx_pKiDs4OCX7tFZIvAwoOqAvkWRLMxXdSi156DaD44N2o9yIP9ICPV3RnXdcIXEFuLDTvRaD-0Md90XZx87jrR4ebZpeICfXaZZloRrCyiW_kwjGYAxw45aJNcpSvIzu4BkKRos1FizTWpTqvAoO2aszC2xQst8uySM4wdVE-rWZybkSQH7qovMIjVCMPHWtX_OUAa62OMwIWNW0LXJgKTBFM-YadMS478w5yr7HbOwzubOStkuvxq9aqvTI10w615b4dfR_m_FSPX1nAsmuA1G_ZEPRrfiKbdJDKeNzM4mQ36Af4mucCRRJpbw6hEX5KNn_krca7ZnkRSdis_TsaPPz4mztFZ_UReCJVC5NLKmNEqFsgnrkd7uIzbyy6QLrrdsyVdmrKHvUlAAAvtCVPDaNNeQ889wJFu-_rg79Kg7SYoa79B3gYCfKi6e-q4l7eKaZmgKiOyQ65k8PCF1MpzhTLn1-O1ZVeFa-_BsmRRYDobVcesvAOOsoSQkvFEq7Jj3Ry2ZdRHDrejeztxPLwR9SzkwkiDln1mRMOhXl_ceSp4E4LUWLKGe7iYqynhIOnRCoBVhHEBo"},
    //     }
    //    const response = await axios.get(`https://ecommerce.staritltd-devemon.one/api/v1/purchase-history/157`, config);

    // return response;
    // } catch (error) {
    //   console.log(error)
    //   return []
// =======

  const updateCustomerProfile = async (data) => {
// >>>>>>> 1c0a8137ab67734f0a7f41afee625a60cf95584a
    
    try {
      console.log(data)
    const response = await axios.get(`https://bme.com.bd/api/version1/customer-profile/update`,data, config);

    return true;
    } catch (error) {
      console.log(error)
      return false
    
    }
  };
}
  export default {
    loginApi,
    getCustomerPurchaseHistory,
    getCustomerProfile,
    updateCustomerProfile
  };