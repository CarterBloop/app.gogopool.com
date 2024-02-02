import { BigNumber } from 'ethers'

import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useWriteContract } from 'wagmi'

import useStakingContract from './contracts/staking'
import useTokenGGPContract from './contracts/tokenGGP'

export const useApproveGGP = (amount: BigNumber) => {
  const { abi, address: ggpTokenAddress } = useTokenGGPContract()

  const { address: stakingAddr } = useStakingContract()
  const addRecentTransaction = useAddRecentTransaction()

  // Removed usePrepareContractWrite - Wagmi v2
  const prepareError = false

  // Updated to useWriteContract - Wagmi v2
  const {
    data: txhash,
    error,
    isError,
    isIdle,
    isPending: isLoading,
    isSuccess,
    status,
    writeContract,
  } = useWriteContract()

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const approveGGP = () => {
    try {
      writeContract({
        abi,
        address: ggpTokenAddress,
        functionName: 'approve',
        args: [stakingAddr, amount],
      })
      addRecentTransaction({
        hash: txhash,
        description: `Approve ${formatEther(amount)} GGP`,
      })
    } catch (error) {
      console.warn(error)
    }
  }

  const resp = {
    data: { hash: txhash },
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    write: approveGGP,
    status,
  }

  // Return same object as v0
  return {
    ...resp,
    prepareError,
    ready: resp?.write !== undefined,
  }
}

export default useApproveGGP
