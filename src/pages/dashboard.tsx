import { BigNumber } from 'ethers'

import { Box, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'

import { Button } from '@/common/components/Button'
import { DashboardContainer } from '@/common/components/Container'
import { PageHead } from '@/common/components/PageHead'
import useCeres from '@/hooks/useCeres'
import { useGetGGPRewards } from '@/hooks/useStake'
import CardTitle from '@/modules/components/Dashboard/Cards/CardTitle'
import DashboardButtonCard from '@/modules/components/Dashboard/Cards/DashboardButtonCard'
import Rewards from '@/modules/components/Dashboard/Cards/Rewards/Rewards'
import TotalStaked from '@/modules/components/Dashboard/Cards/TotalStaked'
import DashboardHeader from '@/modules/components/Dashboard/DashboardHeader'
import MinipoolTable from '@/modules/components/MinipoolTable'
import { ClaimAndRestakeModal } from '@/modules/components/Modal/ClaimAndRestakeModal'
import { SidebarNavbar } from '@/modules/components/SidebarNavbar/SidebarNavbar'

const Dashboard = () => {
  const router = useRouter()
  const { address } = useAccount()
  const { data: ceresData, isLoading: ceresLoading } = useCeres()
  const { data: rewardsToClaimMaybe } = useGetGGPRewards(address)
  const rewardsToClaim = rewardsToClaimMaybe || BigNumber.from(0)

  const { isOpen, onClose, onOpen } = useDisclosure()

  if (ceresLoading) {
    return null
  }

  return (
    <Box className="bg-[#F7F9FF]" minH="full">
      <PageHead append={false} description="Node Operator Dashboard" name="Dashboard" />
      <DashboardContainer>
        <ClaimAndRestakeModal
          isOpen={isOpen}
          onClose={onClose}
          ownerAddress={address}
          rewardsToClaim={rewardsToClaim}
          status={'success'}
        />
        <DashboardHeader ceresData={ceresData} />
        <Box className="space-y-6 bg-[#F7F9FF] p-8 px-4" minH="full">
          <div className="flex shrink flex-wrap justify-around gap-4">
            <TotalStaked />
            <Rewards
              address={address}
              ceresData={ceresData}
              openClaimModal={onOpen}
              rewardsToClaim={rewardsToClaim}
            />
          </div>
          <DashboardButtonCard
            button1={
              <Button
                onClick={() => router.push('/create-minipool')}
                size="xs"
                variant="secondary-filled"
              >
                + New Minipool
              </Button>
            }
            cardTitle={<CardTitle icon={null} title="My Minipools" />}
          >
            <Box pt="4">
              <MinipoolTable ownerAddress={address} />
            </Box>
          </DashboardButtonCard>
        </Box>
      </DashboardContainer>
    </Box>
  )
}

Dashboard.getLayout = function getLayout(page) {
  return <SidebarNavbar>{page}</SidebarNavbar>
}

export default Dashboard
