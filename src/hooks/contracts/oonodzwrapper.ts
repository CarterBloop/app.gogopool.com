import { utils } from 'ethers'

import { useAccount } from 'wagmi'

import { oonodzWrapper } from '../../constants/contractAddresses'

import Wrapper from '@/contracts/OonodzWrapper'

const useOonodzWrapper = () => {
  const { chain } = useAccount()
  const data = oonodzWrapper[chain?.id]
  const contractInterface = new utils.Interface(Wrapper)
  return {
    address: data,
    contractInterface,
    abi: Wrapper,
  }
}

export default useOonodzWrapper
