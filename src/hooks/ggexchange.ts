import { parseUnits } from 'viem'
import { useReadContract } from 'wagmi'

import useTokenggAVAX from './contracts/tokenggAVAX'

const useExchangeRate = () => {
  const { abi: tokenggAVAXInterface, address: tokenggAVAXAddr } = useTokenggAVAX()

  const resp = useReadContract({
    address: tokenggAVAXAddr,
    abi: tokenggAVAXInterface,
    functionName: 'previewDeposit',
    args: [parseUnits('1.0', 18)],
  })

  return resp
}

export default useExchangeRate
