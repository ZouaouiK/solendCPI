import { depositReserveLiquidityAndObligationCollateralI, depositReserveLiquidityAndObligationCollateralMainnet } from "./depositReserveLiquidityAndObligationCollateralI"




async function main(){
// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share of the reserve liquidity pool.
    console.log("***Devnet****")
    await depositReserveLiquidityAndObligationCollateralI()
    console.log("***Mainnet****")
    await depositReserveLiquidityAndObligationCollateralMainnet()
}
main()