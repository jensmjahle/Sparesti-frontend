import axios from 'axios'
import {BASE_URL} from "@/config/config";

const transactionsList = [
  {
    transactionId: 1,
    transactionTitle: "Kiwi",
    date: "15-05-2003",
    debtorAccount: 12312312312,
    debtorName: "Kiwi AS",
    creditorAccount: 32131232132,
    amount: 250,
    currency: "NOK",
    TransactionCategory: {
      category: "Groceries"
    }
  },
  {
    transactionId: 2,
    transactionTitle: "Apple",
    date: "16-05-2003",
    debtorAccount: 12312312312,
    debtorName: "Apple Inc.",
    creditorAccount: 32131232132,
    amount: 300,
    currency: "NOK",
    TransactionCategory: {
      category: "Electronics"
    }
  },
  {
    transactionId: 3,
    transactionTitle: "Banana",
    date: "17-05-2003",
    debtorAccount: 12312312312,
    debtorName: "Banana Corp.",
    creditorAccount: 32131232132,
    amount: 350,
    currency: "NOK",
    TransactionCategory: {
      category: "Banana criminality"
    }
  },
  {
    transactionId: 4,
    transactionTitle: "Orange",
    date: "18-05-2003",
    debtorAccount: 12312312312,
    debtorName: "Orange Ltd.",
    creditorAccount: 32131232132,
    amount: 400,
    currency: "NOK",
    TransactionCategory: {
      category: "Annoying"
    }
  },
  {
    transactionId: 4,
    transactionTitle: "Crab",
    date: "18-05-2003",
    debtorAccount: 12312312312,
    debtorName: "Crab Narcotics.",
    creditorAccount: 32131232132,
    amount: 400,
    currency: "NOK",
    TransactionCategory: {
      category: "Drugs hehe"
    }
  }
];

export const getTransactions = async (token:string, pageNumber: Number, pageSize: Number): Promise<any> => {

  const config = {
    headers: {
      "Content-type": "application/json",
      'Authorization': `Bearer ${token}`
    },
    params:{
      "page": pageNumber,
      "size": pageSize
    }
  }
  try {
    const result = await axios.get(`${BASE_URL}/user/transaction/latest/expense`, config)

    console.log(result.data);
    return result.data;
  } catch (e: any) {
    console.log(e)
    throw e;
  }
}
