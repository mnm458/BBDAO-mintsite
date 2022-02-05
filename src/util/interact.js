import { chainId, contractAddress } from '../constants/address'
import { ethers } from 'ethers'

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const chain = await window.ethereum.request({ method: 'eth_chainId' })
      if (chain === chainId) {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 You can mint new pack now.",
          }
        } else {
          return {
            address: "",
            status: "😥 Connect your wallet account to the site.",
          }
        }
      } else {
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId:chainId }],
        })
        return {
          address: "",
          status: "😥 Connect your wallet account to the site.",
        }
      }
      
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)" 
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      const chain = await window.ethereum.request({
        method: "eth_chainId",
      })
      if (addressArray.length > 0 && chain === chainId) {
        return {
          address: addressArray[0],
          status: "👆🏽 You can mint new pack now.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask and choose the correct chain using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: "🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)"
    }
  }
}

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contractABI = require("../constants/contract.json")
  const contract = new ethers.Contract(contractAddress, contractABI, signer)
  return contract
}
