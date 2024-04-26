import axios from "axios";

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
    console.log(data)
    return await axios.post(`http://localhost:8080/user/challenge/create`,data,config);
  } catch (error){
    console.error(error);
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
    return await axios.delete(`http://localhost:8080/user/challenge/delete/${challengeId}`,config);
  } catch (error){
    console.error(error);
    throw error;
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
    console.log(config)
    return await axios.post(`http://localhost:8080/user/challenge/complete`,{},config);
  } catch (error){
    console.error(error);
    throw error;
  }
}

export const activateChallenge= async (token:string, challengeId: number):Promise<any>=>{
  console.log(challengeId)
  console.log(token)
  try{
    const config = {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return await axios.post(`http://localhost:8080/user/challenge/activate/${challengeId}`,{},config);
  } catch (error){
    console.error(error);
    throw error;
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
    return await axios.get(`http://localhost:8080/user/challenge/${challengeId}`,config);
  } catch (error){
    console.error(error);
  }
}


export const getActiveChallenges = async (token:string):Promise<any>=>{
  console.log(token)
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
    const result = await axios.get('http://localhost:8080/user/challenge/paginated/active',config);
    console.log('result')
    console.log(result)
    return result.data;
  } catch (error){
    console.error(error);
    return activeChallengesTestData
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
    const result = await axios.get('http://localhost:8080/user/challenge/paginated/inactive',config);
    console.log('interactive')
    console.log(result);
    return result.data;
  } catch (error){
    console.error(error);
    return challengeRecomendationsTestData
  }
}





