import { utils } from 'ethers'

import { useAccount } from 'wagmi'

import { oonodzNodeIdNFT } from '../../constants/contractAddresses'

import OonodzNodeIdNFT from '@/contracts/OonodzNodeIdNFT'

const useOonodzNodeIdNFT = () => {
  const { chain } = useAccount()
  const data = oonodzNodeIdNFT[chain?.id]
  const contractInterface = new utils.Interface(OonodzNodeIdNFT)
  return {
    address: data,
    contractInterface,
    abi: OonodzNodeIdNFT,
  }
}

export default useOonodzNodeIdNFT
