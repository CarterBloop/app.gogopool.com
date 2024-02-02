import { createConfig, http } from 'wagmi'
import { avalanche, avalancheFuji } from 'wagmi/chains'
import { safe, walletConnect } from 'wagmi/connectors'

export const configWagmiClient = () => {
  // const { connectors } = getDefaultWallets({
  //   appName: 'GoGoPool',
  //   chains,
  //   projectId: '14ced539274121ccca8d831af2c0a924',
  // })
  //
  // const wagmiClient = createConfig({
  //   autoConnect: true,
  //   provider,
  //   connectors: [
  //     ...connectors(),
  //     new SafeConnector({
  //       chains,
  //       options: {
  //         allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  //         debug: false,
  //       },
  //     }),
  //     // see here for more info: https://wagmi.sh/core/connectors/walletConnect
  //     new WalletConnectConnector({
  //       chains,
  //       // why do we need to keep this? If I remove it I get an error
  //       options: {
  //         projectId: '14ced539274121ccca8d831af2c0a924',
  //       },
  //     }),
  //   ],
  // })
  const wagmiConfig = createConfig({
    chains: [avalanche, avalancheFuji],
    connectors: [
      safe({
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      }),
      walletConnect({
        projectId: '14ced539274121ccca8d831af2c0a924',
      }),
    ],
    transports: {
      [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
      [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
    },
  })

  return {
    wagmiConfig,
  }
}

export default configWagmiClient
