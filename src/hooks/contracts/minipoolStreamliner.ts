import { utils } from 'ethers'

import { useAccount } from 'wagmi'

import { minipoolStreamliner } from '../../constants/contractAddresses'

import MinipoolStreamliner from '@/contracts/MinipoolStreamliner'

const useMinipoolStreamlinerContract = () => {
  const { chain } = useAccount()
  const data = minipoolStreamliner[chain?.id]

  const contractInterface = new utils.Interface(MinipoolStreamliner)
  return {
    address: data,
    contractInterface,
    abi: MinipoolStreamliner,
  }
}

export default useMinipoolStreamlinerContract
