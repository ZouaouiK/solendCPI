import { depositObligationCollateral, depositObligationCollaterallWithMainnet } from "./depositObligationCollateral"




async function main(){
// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share of the reserve liquidity pool.
   
    //console.log("********************************* devnet***************")
    //await depositObligationCollateral()
    console.log("********************************* mainnet***************")
    await depositObligationCollaterallWithMainnet()
}
main()