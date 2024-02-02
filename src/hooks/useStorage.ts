import { ethers } from 'ethers'

import { useAccount, useReadContract } from 'wagmi'

import { storageAddresses } from '../constants/storageAddresses'

import Storage from '@/contracts/Storage'
import { HexString } from '@/types/cryptoGenerics'

export const useGetUint = (args) => {
  const { chain } = useAccount()
  const addr = storageAddresses[chain?.id]

  return useReadContract({
    address: addr,
    abi: Storage,
    functionName: 'getUint',
    args: [args],
  })
}

export type AllContracts =
  | 'Oracle'
  | 'Storage'
  | 'MinipoolManager'
  | 'TokenGGP'
  | 'TokenggAVAX'
  | 'Staking'
  | 'OneInchMock'
  | 'RewardsPool'
  | 'ClaimNodeOp'
  | 'ProtocolDAO'
  | 'MinipoolStreamliner'

export const useGetAddress = (key: AllContracts, storageAddr?: string) => {
  const { chain } = useAccount()
  const addr: HexString = storageAddr || storageAddresses[chain?.id]

  const args = ethers.utils.solidityKeccak256(
    ['string', 'string'],
    ['contract.address', key],
  ) as HexString

  // Removed generic type: <typeof Storage, 'getAddress', HexString>, caused compiler errors
  const resp = useReadContract({
    address: addr,
    abi: Storage,
    functionName: 'getAddress',
    args: [args],
  })

  return resp
}
