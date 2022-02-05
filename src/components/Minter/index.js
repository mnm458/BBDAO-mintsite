/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { connectWallet, getCurrentWalletConnected } from '../../util/interact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { chainId } from '../../constants/address';
import { getContract } from '../../util/interact';
import { BigNumber } from 'ethers';
import './index.css'

export default function Minter() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [status, setStatus] = useState(null);
  const [counter, setCount] = useState(1);
  const [loading, setMintLoading] = useState(false)
  const [totalSupply, setTotalSupply] = useState(0)
  const [numberOfWallet, setNumberOfWallet] = useState(0)
  const onClickConnectWallet = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  }
  const notify = () => toast.info(status, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setStatus("👆🏽 You can mint new pack now.");
        } else {
          setWalletAddress(null);
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
      window.ethereum.on("chainChanged", (chain) => {
        connectWalletPressed()
        if (chain !== chainId) {
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
          {/* </a> */}
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWalletAddress(walletResponse.address);
  };
  const decrease = () => {
    if(counter > 1) {
      setCount(counter-1)
    }
  }
  const increase = () => {
    if(counter < 3)
    setCount(counter+1)
  }

  const onMint = async () => {
    if(!walletAddress) {
      setStatus('Please connect with Metamask')
      return
    }

    if(counter > 3000 - totalSupply) {
      setStatus(`We are reached already max supply, You can mint less than ${3000 - totalSupply}`)
      return
    }

    if(parseInt(numberOfWallet) + counter > 3) {
      setStatus(`Exceeded max token purchase per wallet`)
      return
    }
    setMintLoading(true)

    const contract = getContract()

    try {
      let tx = await contract.mintToken(counter, { value: BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(8).div(100).mul(counter), from: walletAddress })
      let res = await tx.wait()
      if (res.transactionHash) {
        setStatus(`You minted ${counter} BBOYDAOS Successfully`)
        setMintLoading(false)
      }
    } catch(err) {
      let status = "Transaction failed because you have insufficient funds or sales not started"
      setStatus(status)
      setMintLoading(false)
    }
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()
    setWalletAddress(address)
    setStatus(status)
    addWalletListener()
  }, [])

  useEffect(() => {
    if (status) {
      notify()
      setStatus(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect( async () => {
    if(!loading && walletAddress) {
      let contract = getContract()
      let res = await contract.totalSupply()
      setTotalSupply(BigNumber.from(res).toString())
      let numofwallet = await contract.numberOfwallets(walletAddress)
      setNumberOfWallet(BigNumber.from(numofwallet).toString())
    }
  }, [loading, walletAddress] )  

  return(
    <div style={{flex: 1, display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <div>
        <div className='top'>
          <p className='ptop'>Take a hit, let's make a noise like NBA</p>
        </div>
        <div className='bottom'>
          <p className='pbottom'>Keep performance during the match with help of unique kong boosts on rare cards</p>
        </div>
        <div style={{ paddingTop: '20px' }}>
          {walletAddress && (
            <>
            <h1 className='mint-amount'>Minted {totalSupply}/3000</h1>
            <h6 className='mint-price'>Total Price: {0.08 * counter}ETH</h6>
              <div className='div-counter'>
                <button className='minus' onClick={decrease}>-</button>
                <h1 className='counter'>{counter}</h1>
                <button className='plus' onClick={increase}>+</button>
              </div>
            </>
          )}
          {walletAddress ? <Button className='mint-btn' onClick={onMint}>Mint</Button> : <Button className='connect-btn' onClick={() => onClickConnectWallet()}>Connect to Wallet</Button>}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
