import axios from 'axios'

export const getTransactions = async (pageNumber: Number, pageSize: Number): Promise<any> => {

  const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + "Ddaddaaddasasda"
    }
  }
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
        category: "Annoying shit"
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


  const pageable = {
    pageNum: pageNumber,
    pageSize: pageSize
  }
  try {
    await axios.post("localhost:8080/user/transaction/latest/expense", pageable, config)
  } catch (e: any) {
    console.log("sending test data")
    return transactionsList
    // throw "Failed to fetch transacions: "+e.response.data
  }
}
