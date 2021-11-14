import Big from "big.js";

// https://github.com/MikeMcl/bignumber.js
// https://blog.csdn.net/shenxianhui1995/article/details/103985434
// 1e18
export class TokenAmount {
  public wei: Big

  public decimals: number
  public _decimals: Big

  constructor(wei: number | string | Big, decimals: number = 1, isWei = true) {
    console.log(decimals);
    console.log(wei);
    this.decimals = decimals
    this._decimals = new Big(10).pow(decimals)
    
    if (isWei) {
      this.wei = new Big(wei)
    } else {
      this.wei = new Big(wei).mul(this._decimals)
    }
  }

  toEther() {
    return this.wei.div(this._decimals)
  }

  toWei() {
    return this.wei
  }

  fixed(decimals: number) {
    return this.wei.div(this._decimals).toFixed(decimals, 0)
  }

  isNullOrZero() {
    const n = this.wei.toNumber();
    return isNaN(n) || n == 0;
  }
  // + plus
  // - minus
  // × multipliedBy
  // ÷ dividedBy
}