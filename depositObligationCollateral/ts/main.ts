import { depositObligationCollateral } from "./depositObligationCollateral"




async function main(){
// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share of the reserve liquidity pool.
    await depositObligationCollateral()
}
main()