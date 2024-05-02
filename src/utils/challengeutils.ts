import axios from "axios";
import { BASE_URL } from "@/config/config";
import {useToast} from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

const challengeRecomendationsTestData = [
  {
    challengeId:1,
    challengeTitle:'Gå til skolen!',
    challengeDescription:'Spar 46kr hver dag du går isteden for å ta buss til skolen denne uken.'
  },
  { challengeId: 2,
    challengeTitle:'Unngå kjøp av kaffe!',
    challengeDescription:'Spar 59kr for å unngå kjøp av kaffe i dag.'
  },
  { challengeId: 3,
    challengeTitle:'Bruk handlenett på butikken!',
    challengeDescription:'Spar 5kr for å burke handlenett på butikken.'
  },
];

const activeChallengesTestData = [
  {
    challengeId: 4,
    challengeTitle:'Spis middag hjemme!',
    challengeDescription:'Spar 200kr for å spise middag hjemme i dag.'
  },
  { challengeId: 5,
    challengeTitle:'Kjøp brukt isteden for nytt!',
    challengeDescription:'Spar 250kr for å kun kjøpe brukt denne uken.'
  },
  { challengeId: 6,
    challengeTitle: 'Ta med lunsj hjemmefra!',
    challengeDescription:'Spar 100kr for å ta med lunsj hjemmefra i dag.'
  },
  { challengeId: 7,
    challengeTitle: 'Unngå netthandel!',
    challengeDescription:'Spar 500kr for å unngå netthandel denne måneden.'
  },
]

export const createChallenge = async (
  token: string, data: any ):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.post(`${BASE_URL}/user/challenge/create`,data,config);
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke opprette utfordringen. Prøv igjen senere.');
  }
}

export const deleteChallenge = async (token:string, challengeId: number):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.delete(`${BASE_URL}/user/challenge/delete/${challengeId}`,config);
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke slette utfordringen. Prøv igjen senere.');
  }
}

export const completeChallenge= async (token:string, challengeId:number, milestoneId:number):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        challengeId: challengeId,
        milestoneId: milestoneId
      }
    };
    return await axios.post(`${BASE_URL}/user/challenge/complete`,{},config);
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke fullføre utfordringen. Prøv igjen senere.');
  }
}

export const activateChallenge= async (token:string, challengeId: number):Promise<any>=>{
  console.log(challengeId)
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.post(`${BASE_URL}/user/challenge/activate/${challengeId}`,{},config);
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke aktivere utfordringen. Prøv igjen senere.');
  }
}

export const getChallenge = async (token:string, challengeId: number):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.get(`${BASE_URL}/user/challenge/${challengeId}`,config);
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke hente utfordringen. Prøv igjen senere.');
  }
}


export const getActiveChallenges = async (token:string, page:number, size:number):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        'page': page,
        'size': size
      }

    };
    const result = await axios.get(`${BASE_URL}/user/challenge/paginated/active`,config);
    console.log('result')
    console.log(result)
    return result.data;
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke hente aktive utfordringer. Prøv igjen senere.');
  }
}

export const getInactiveChallenges  = async (token:string):Promise<any>=>{
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      params: {
        'page': 0,
        'size': 10
      }
    };
    const result = await axios.get(`${BASE_URL}/user/challenge/paginated/inactive`,config);
    console.log('interactive')
    console.log(result);
    return result.data;
  } catch (error){
    console.error(error);
    toast.error('Kunne ikke hente forespurte utfordringer. Prøv igjen senere.');
  }
}





