import { redeemReserveCollateral, redeemReserveCollateralWithMainnet } from "./redeemReserveCollateral"




async function main(){
// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share of the reserve liquidity pool.

// console.log("********************************* devnet***************")
   // await redeemReserveCollateral()
 console.log("********************************* mainnet***************")
    await redeemReserveCollateralWithMainnet() 
}
main()