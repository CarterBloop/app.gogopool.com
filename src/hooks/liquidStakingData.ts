import { useReadContract } from 'wagmi'

import useExchangeRate from './ggexchange'
import { useGetStakerCount } from './useStake'

import useTokenggAVAXContract from '@/hooks/contracts/tokenggAVAX'

// gets the liquid staking statistics from the contract
const useLiquidStakingData = () => {
  const { abi: ggAVAXInterface, address: ggAVAXAddr } = useTokenggAVAXContract()

  const { data: ggAvaxExchangeRate, isLoading: isExchangeRateLoading } = useExchangeRate()

  const { data: totalStakedAVAX, isLoading: isStakingBalanceLoading } = useReadContract({
    address: ggAVAXAddr,
    abi: ggAVAXInterface,
    functionName: 'totalReleasedAssets',
  })

  const { data: rewardsCycleLength, isLoading: isRewardsCycleLengthLoading } = useReadContract({
    address: ggAVAXAddr,
    abi: ggAVAXInterface,
    functionName: 'rewardsCycleLength',
    // No watch param in wagmi v2
    // watch: true,
  })

  const { data: stakerCount } = useGetStakerCount()

  const isLoading = isExchangeRateLoading || isStakingBalanceLoading || isRewardsCycleLengthLoading

  return {
    ggAvaxExchangeRate,
    isLoading,
    rewardsCycleLength,
    totalStakedAVAX,
    stakerCount,
  }
}

export default useLiquidStakingData
