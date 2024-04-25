import axios from 'axios';

const testDataUserAccounts:{}[] = [
  {
    'accountNumber': 123456789,
    'username': 'brukernavn',
    'balance': 12000,
    'name': 'A',
    'type': 'Forbrukskonto',
    'currency': 'NOK'
  },
  {
    'accountNumber': 987654321,
    'username': 'brukernavn',
    'balance': 13000,
    'name': 'B',
    'type': 'Sparekonto',
    'currency': 'NOK'
  },
  {
    'accountNumber': 111222333,
    'username': 'brukernavn',
    'balance': 14000,
    'name': 'C',
    'type': 'Forbrukskonto',
    'currency': 'NOK'
  },
  {
    'accountNumber': 444555666,
    'username': 'brukernavn',
    'balance': 1500,
    'name': 'D',
    'type': 'Sparekonto',
    'currency': 'NOK'
  },

]

const testDataUser = {
  'username': 'brukernavn',
  'email': 'brukernavn@email.com',
  'firstName': 'Fornavn',
  'lastName': 'Etternavn',
  'profilePictureBase64':'',
  'monthlyIncome': 12000,
  'monthlySavings':3500,
  'monthlyFixedExpenses': 7000,
  'currentAccount': 123456789,
  'savingsAccount': 987654321,
  'achievements': [
    {
      id:1,
      title: 'Mynt A',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:2,
      title: 'Mynt B',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:3,
      title: 'Mynt C',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:4,
      title: 'Mynt D',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:5,
      title: 'Mynt E',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:6,
      title: 'Mynt F',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:7,
      title: 'Mynt G',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:8,
      title: 'Mynt H',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:9,
      title: 'Mynt I',
      img:'/src/assets/png/gold-coin.png'
    },
    {
      id:10,
      title: 'Mynt J',
      img:'/src/assets/png/gold-coin.png'
    },
  ],
}

export const deleteUser = async (token:string):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.delete('http://localhost:8080/users/delete',config);
  } catch (error){
    console.error(error);
    throw error;
  }
}

export const getUserAccountInfo = async (token:string):Promise<any> => {
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const result = await axios.get('http://localhost:8080/user/account', config);
    return result.data;
  } catch (error){
    console.log('sending mock data')
    return testDataUserAccounts;
  }
}
export const getUserInfo = async (token:string): Promise<any> => {
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const result = await axios.get('http://localhost:8080/users/get', config);
    return result.data;
  } catch (error){
    console.log('sending mock data')
    return testDataUser;
  }
}

export const updateUserInfo = async (
  token:string,
  email: string,
  profilePictureBase64: string)=> {
  try{
    const config ={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const data = {
      'email': email,
      'profilePictureBase64': profilePictureBase64
    };
    return await axios.post('http://localhost:8080/users/update',data,config);
  } catch (error){
    console.error(error)
    throw error;
  }
}

export const updatePasswordInfo = async (
  token:string,
  currentPassword: string,
  newPassword:string)=> {
  try{
    const config ={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const data = {
      'password': currentPassword,
      'newPassword': newPassword
    };
    return await axios.post('http://localhost:8080/userCredentials/updatePassword',data,config);
  } catch (error){
    console.error(error)
    throw error;
  }
}
export const updateBankAccountInfo = async (
  token:string,
  checkingAccount: number,
  savingAccount: number): Promise<any> =>{
  try{
    const config ={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };
    const data = {
      'currentAccount': checkingAccount,
      'savingAccount': savingAccount
    };
    return await axios.post('http://localhost:8080/users/update',data,config);
  } catch (error){
    console.error(error)
    throw error;
  }
}

export const updateIncomeInfo = async (
  token:string,
  monthlyIncome:number,
  monthlyFixedExpenses:number,
  monthlySavings:number): Promise<any> =>{
  try{
    const config ={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const data = {
      'monthlyIncome': monthlyIncome,
      'monthlyFixedExpenses': monthlyFixedExpenses,
      'monthlySavings': monthlySavings
    };
    return await axios.post('http://localhost:8080/users/update',data,config);
  } catch (error){
    console.error(error)
    throw error;
  }
}