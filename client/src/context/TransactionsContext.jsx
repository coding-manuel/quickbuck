import React, {useEffect, useState} from "react"
import {ethers } from 'ethers'

import {contractABI, contractAddress } from "../utils/constants"

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionContract
}

export const TransactionsProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({address: '', amount: '', keyword: '', message: ''})
    const [loading, setLoading] = useState(false)
    const [wloading, setWloading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState([]);
    const [notify, setNotify] = useState(false);

    const getAllTransactions = async () =>{
        try {
            if(!ethereum) return alert("Please Install MetaMask")
            const transactionContract = getEthereumContract()

            const availibleTransactions = await transactionContract.getAllTransactions()

            const structuredTransactions = availibleTransactions.map((transaction) =>({
                addressTo: transaction.reciever,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 100).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransactions(structuredTransactions)
        }catch(error){
            console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () =>{
        try {
            if(!ethereum) return alert("Please Install MetaMask")

            const accounts = await ethereum.request({method: "eth_accounts"})

            if(accounts.length){
                setCurrentAccount(accounts[0])

                getAllTransactions()
            }else{
                console.log('No Accounts Found')
                setNotify(true)
            }
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
    }

    const checkIfTransactionsExist = async() =>{
        try {
            const transactionContract = getEthereumContract()
            const transactionCount = await transactionContract.getTransactionCount()

            window.localStorage.setItem('transactionCount', transactionCount)
        } catch (error) {
            console.log(error)

            throw new Error("No Ethereum Object")
        }
    }

    const connectWallet = async () => {
        try {
            setNotify({})

            setWloading(true)
            if(!ethereum) return alert("Please Install MetaMask")

            const accounts = await ethereum.request({method: "eth_requestAccounts"})

            setCurrentAccount(accounts[0])

            setWloading(false)
        } catch (error) {
            console.log(error)

            setWloading(false)

            throw new Error("No Ethereum Object")
        }
    }

    const sendTransaction = async (values) => {
        try {
            if(!ethereum) return alert("Please Install MetaMask")

            setLoading(true)

            const {amount, address, keyword, message} = values

            const transactionContract = getEthereumContract()
            const parsedAmount = ethers.utils.parseEther(amount.toString())

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: address,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract.addToBlockchain(address, parsedAmount, message, keyword)

            await transactionHash.wait()

            setLoading(false)

            const transactionCount = await transactionContract.getTransactionCount()

            setTransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.log(error)

            setLoading(false)
            throw new Error("No Ethereum Object")
        }
    }

    useEffect(() =>{
        checkIfWalletIsConnected()
        checkIfTransactionsExist()
    }, [])

    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, sendTransaction, setFormData, loading, transactions, wloading, notify}}>
            {children}
        </TransactionContext.Provider>
    )
}