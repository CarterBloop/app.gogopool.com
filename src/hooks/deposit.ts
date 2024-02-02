import { BigNumber } from 'ethers'

import { useToast } from '@chakra-ui/react'
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit'
import { formatEther } from 'ethers/lib/utils'
import { useWriteContract } from 'wagmi'

import useTokenContract from './contracts/tokenggAVAX'

import { DECODED_ERRORS } from '@/utils/consts'

const useDeposit = (amount: BigNumber) => {
  const { abi, address } = useTokenContract()
  const addRecentTransaction = useAddRecentTransaction()
  const toast = useToast()

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

  const depositAVAX = () => {
    try {
      if (!amount.eq(BigNumber.from(0))) {
        writeContract({
          abi,
          address,
          functionName: 'depositAVAX',
          args: [],
          overrides: {
            value: amount,
          },
        })
        addRecentTransaction({
          hash: txhash,
          description: `Deposit ${formatEther(amount)} AVAX`,
        })
      }
    } catch (error) {
      Object.keys(DECODED_ERRORS).forEach((key) => {
        if (error?.message.includes(key)) {
          toast({
            position: 'top',
            title: 'Error during deposit of AVAX',
            description: DECODED_ERRORS[key],
            status: 'error',
            duration: 20000,
            isClosable: true,
          })
        }
      })
    }
  }

  const resp = {
    data: { hash: txhash },
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    write: depositAVAX,
    status,
  }

  return {
    ...resp,
    ready: resp?.write !== undefined,
  }
}

export default useDeposit
