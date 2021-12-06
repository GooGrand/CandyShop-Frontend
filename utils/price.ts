
const coingeckoUrl = ""

export async function getGtonPrice(): Promise<string> {
    const res = await fetch(coingeckoUrl + "/coins/graviton")
    const body = await res.json();
    return body.market_data.current_price.usd
}