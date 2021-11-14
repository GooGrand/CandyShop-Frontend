import { Chains } from "~/utils/metamask"

export const chainPics: { [key in Chains]?: string } = {
  [Chains.Eth]: require('~/assets/img/interface/etherium.svg'),
  [Chains.Ftm]: require('~/assets/img/interface/fantom.svg'),
  [Chains.Pol]: require('~/assets/img/interface/poligon.svg'),
}

export const chainName: { [key in Chains]?: string } = {
  [Chains.Eth]: 'Ethereum',
  [Chains.Ftm]: 'Fantom',
  [Chains.Pol]: 'Polygon',
}

export const chains: {id: Chains, img: string | undefined, alt: string}[] = [
  {
    id: Chains.Eth,
    img: chainPics[Chains.Eth],
    alt: "Ethereum"
  },
  {
    id: Chains.Pol,
    img: chainPics[Chains.Pol],
    alt: "Polygon"
  },
  {
    id: Chains.Ftm,
    img: chainPics[Chains.Ftm],
    alt: "Fantom"
  },
]
