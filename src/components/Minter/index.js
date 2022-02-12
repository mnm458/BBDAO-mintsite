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
  const [presale, setPresale] = useState(false)
  const [price, setPrice] = useState(0)

  const whitelistAddresses = [
    '0x7Fdf2A428C76F9E983919C0f1A89Eb5f4C09AC3C',
    '0xb6524111b586be9fa6f5C7c06754e38584350f53',
    '0x86d23eed4b5010bdd5e53b318906eb6ab0dde809',
    '0xf434E03fD2d7a6268cc239A5bDf6Feeb507a643F',
    '0x0064f54f2084758afA4E013B606A9fdD718Ec53c',
    '0xBCee3d856a6c879f27Da792528AF7F29B4759aa4',
    '0xC5792432bEAE6d7b1106d91d384Ae74770f4E6c8',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0xC26F27Cfc444867342040675F67a7D5CD0F28358',
    '0x75e53ece4b5117bdd5e53b318906eb6ab0dde809',
    '0x75e53ece4b5117bdd5e53b318906eb7ab0dde809',
    '0x0b7daC70AA8e82B0cF5ea07A6aaA236868F68289',
    '0x849C279e60B1B1Ae0009cd352127eAc196158005',
    '0x665E0F5D5545831c8D8a3651719348a72069fD5B',
    '0x3Cf6Ac98E92eDb239148b43E769A0903d2A33cF6',
    '0x3F843fbb39549aA26d27a3FeE07DE175ad9F47F9',
    '0xe0893E36348D6887FD78F91bdF6775df0B04a236',
    '0x5401DDa1fa812DD4444cd65c262c29eAaf8c76Ab',
    '0x98139f943753bb98ed5b346621d38dadd51b416f',
    '0x8c9E69446c058192A028A338a8d928a96fcA8123',
    '0x820163497e1d93Ea87dDa7142dABeC3B81a76198',
    '0x1Cc839b23A915944276B7f594F8621E9ea537ECc',
    '0x31AaA692c9e2214CBAA9EcF212d91aeadd029D95',
    '0xb8cfb9b5f2ad9fa46d8310e027c24fad2b4a7c61',
    '0x64e4c7f705A88E785D1C9D1BAccE7eEfE5D33116',
    '0x9F1f0892D802f63142C5b909C31F23aFE84a9479',
    '0x5Ec8ADC3d4488f90eA1FBbf38d878A9cE53e7bD4',
    '0xD82E856eEe61f4B0ca9564c23341E56211f3114f',
    '0xfC16F3de076cdbbB8B5592DE226702cda9817F23',
    '0xB344b72E09c14Cbae0eDDD2d089c996573afC707',
    '0x9D9509103458153Bb224618A7a48E9aF90B61770',
    '0x95fb403c759A9ba94D336eA9ccC42128CBB6Dea9',
    '0x2616E2A97b59bA6e574317051adfE57A7758d19F',
    '0x1fd843496ca8e4e1925c8Bdc95678b38127bd6A4',
    '0x93A0b26D227D3A26e190d3Df57Db78e582385569',
    '0x842858c0093866AbD09A363150Fb540D97E78223',
    '0x8776E81a4AD670662384A36116c819D4226B29db',
    '0xa47Dc816B1Ee8a1F3C6CC9FFb85766FB5bCcB1C0',
    '0x46587e313686713Ecca4B07876D110380964a005',
    '0x7F21334311EF7aCCa5c88D2bcfdfe03df391c95F',
    '0x8a1bDD6b3dB67C5AD6b6365317B1b6F6a2Ad92E9',
    '0x10f81231879A1038960707D861deb248F5D3957e',
    '0x1092B3E4cD5823a2432cd61864dbE2C235393C1c',
    '0x14f24Efe1B20842AC1A7d0bD89724dF783f5F6e0',
    '0x9a6dFfB91d69bB23CF3B1862298540ACe0eB3DC1',
    '0x853c9A5975895F670C2334c9943c3ECFc170a17C',
    '0x54c0Fb686CDb04954901A24F9FE1cC38E8A3F9ad',
    '0x4f98639586e10Bf418AA385be7Cc8bC915eC2BBd',
    '0xc41adb7236880cfbDD767d577Eb4ac7feB71c79e',
    '0x4f98639586e10Bf418AA385be7Cc8bC915eC2BBd',
    '0x76304B7f3b699E97611eB007a6Fc970BFA15308B',
    '0x82C242361E8fCA09C54F18F95d2a53a713bDf4b6',
    '0x3F843fbb39549aA26d27a3FeE07DE175ad9F47F9',
    '0x14f24Efe1B20842AC1A7d0bD89724dF783f5F6e0',
    '0x11eA9589d8ad2f6D48B340b82148b6d96a6729e9',
    '0xDBa0492Bdd317bB87ceBBE0438ED32CDd9916892',
    '0x05b0624FEddB86c5Fee866C9418e671C86e48b88',
    '0x3D2702a2433Bbfb37A938a4c66115655Ba6FFdC6',
    '0xC5792432bEAE6d7b1106d91d384Ae74770f4E6c8',
    '0x27D2264FF6c5c061d6f2d07c02F7C1e4C6d218A7',
    '0xdFdd17F1b9c19aC29876B8295D50531F13019d5C',
    '0xF560E78BA626B29F91DA47603fcb2A7B2f055103',
    '0x9a6dFfB91d69bB23CF3B1862298540ACe0eB3DC1',
    '0xAcb7Aefd8596Af7b01e510BeEbDA41DFC646E1aE',
    '0x72C71Cd40B664ab00f771d9d8b74BCE764cA24C5',
    '0x1eC8D76B3Eb4AFd5B57A7f0ec04a8E74cEe5C8C7',
    '0x9654eeBEE4b8AdA1e12f3Cc71A9FABD0deA5E75f',
    '0x0064f54f2084758afA4E013B606A9fdD718Ec53c',
    '0xdEce1006fA365a79020413E07536aD7038a71b43',
    '0x0b7daC70AA8e82B0cF5ea07A6aaA236868F68289',
    '0x64e4c7f705A88E785D1C9D1BAccE7eEfE5D33116',
    '0x1fd843496ca8e4e1925c8Bdc95678b38127bd6A4',
    '0x47fD3F28ABe2CEa99C9c9Be02C7302e2D3bAC0E9',
    '0x9f50AbE936E03D8cF1b6d1941A28D60D5e6442e4',
    '0x58C1b5c806B55552C4a63392ddB21b59b8Fe8F40',
    '0xd7bADc2bC3Cd07c7817CD047E12Dd04f86c5f65e',
    '0x05c81818162F186863fAdfaeF61582d716332fF4',
    '0x3ee030730AEc1a04B54E41b4Ca2faa971646fAa7',
    '0x39737a1fD124906f8089591876dE9E1e5B31d8d6',
    '0x6b1D7C8D19f2081F51A1F21CD483DF70ee930EcF',
    '0xeae33Ec032D0bF7E85257Fd3A02C4Da7bFC07307',
    '0x2B4b0A85Ab7327390150103975426A8166f45721',
    '0x2f7c480dE3E3D81Ac5343B0d98C8454e32825D66',
    '0xA4dE4B3F988CFf1407827397d23206F5d827780f',
    '0x658ef0F7B73a9cf26D7B87a0987C6DFcBF3fE243',
    '0x517866033b518a8940dfb25375bb06cf417b70e5',
    '0x63260Fc3E612442c3b341527D7059b616534c8D9',
    '0xd7bADc2bC3Cd07c7817CD047E12Dd04f86c5f65e',
    '0x2e13d430C6aD44f9021CCcD15934D1c7c1F8541a',
    '0xE8Dd93da7A7031465300C3A40652319555D10EE7',
    '0x124274d4dbff126a0440b8660403974c986d35fa',
    '0x2858dD6625fee7af523467F2E86225571113D267',
    '0x10f81231879A1038960707D861deb248F5D3957e',
    '0x8a7E071Df0A5616afFE0b32F665ec6B2587Fe495',
    '0x12C23132185EE6329c3b1852ba7D868e510313c5',
    '0x299c46eFbb1253B47c9EDdb892ceB8D2F2d3b7bd',
    '0xE6Bf538caf0899C3F49fC1A8811552c0419aD2d0',
    '0xcaDCccc1d663f638D3B3DB716748Bb54f49429EA',
    '0xD902672947Ea5C215213404132f60a49b4243E02',
    '0xee29887E3b9b303C395d02AD766f28f7146AB462',
    '0x14dbF36f2b8b84cc8d85803455239Af48a86D1Ce',
    '0xe35B93421799a45915407AE39805E20295886832',
    '0x0f4D9c6d701910566Dd8C90272CD6E8a044B6236',
    '0xB050143eb5692e55B43012a6a619A6559b02F950',
    '0xeB68b6a6501FB6c4b3A2CFAda5a98C5FC6ec7b44',
    '0x6d5FE90cfdB9e3eBBf09Bd3481a48E0e5CA1fCc1',
    '0xd807826A2bE1C4dbe41c82217167592Ca1A6AcA0',
    '0x567e6d9Cf3429dD29e39Dd5F39042EEF05BFe7DC',
    '0xe1D49EBb7AD1B5aAF4806DB4FC4d1CD5729bEf5c',
    '0xC0396F612dEAfF11401b6Ce1709CbD57B89F8dA3',
    '0x28bF78E376e2Ab672bDB48aBc82E0734B2B76958',
    '0xD60ae483997d2DB15dF88D2C8920a58d0480C189',
    '0x5dCec429305d1d6bB63301dF1DB72014D7a4ecef',
    '0xe80DF5Fa8FF82b7E49dC3f78B68aA70887F490b2',
    '0xe80DF5Fa8FF82b7E49dC3f78B68aA70887F490b2',
    '0x88D25C32cEb2C6FC87E1F63B21Cf0499eAAd10c'
  ].map(addr => addr.toLowerCase())

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
          setStatus("🦊 Connect to Metamask using the connect button.");
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
    if(counter < (presale ? 10 : 5))
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

    if(parseInt(numberOfWallet) + counter > (presale ? 10 : 5)) {
      setStatus(`Exceeded max token purchase per wallet`)
      return
    }
    setMintLoading(true)

    const contract = getContract()

    try {
      console.log(presale)
      if(presale) {
        let result = whitelistAddresses.includes(walletAddress.toLowerCase())
        setPrice(25)
        if (result) {
          setStatus('You are included in whitelist')
          let tx = await contract.mintToken(counter, { value: BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(price).div(1000).mul(counter), from: walletAddress })
          let res = await tx.wait()
          if (res.transactionHash) {
            setStatus(`You minted ${counter} BBOYDAOS Successfully`)
          }
        } else {
          setStatus('You are not included in whitelist')
        }
      } else {
        console.log(price)
        setStatus('PublicSale is running')
        setPrice(29)
        let tx = await contract.mintToken(counter, { value: BigNumber.from(1e9).mul(BigNumber.from(1e9)).mul(price).div(1000).mul(counter), from: walletAddress })
        let res = await tx.wait()
        if (res.transactionHash) {
          setStatus(`You minted ${counter} BBOYDAOS Successfully`)
        }
      }
      setMintLoading(false)
    } catch(err) {
      console.log(err)
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

  useEffect(async () => {
    let contract = getContract()
    await contract.saleStatus().then(res =>{
      setPresale(res)
    })
  }, [presale])

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
            <h6 className='mint-price'>Total Price: {((presale  ? 0.025 : 0.029) * counter).toFixed(3)}ETH</h6>
              <div className='div-counter'>
                <button className='minus' onClick={decrease}>-</button>
                <h1 className='counter'>{counter}</h1>
                <button className='plus' onClick={increase}>+</button>
              </div>
            </>
          )}
          {walletAddress ? (!loading ? <Button className='mint-btn' onClick={onMint}>Mint</Button> : <p className='mint-loading'>Minting...</p>) : <Button className='connect-btn' onClick={() => onClickConnectWallet()}>Connect to Wallet</Button>}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
