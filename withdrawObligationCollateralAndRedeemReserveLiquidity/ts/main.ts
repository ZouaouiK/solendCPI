import {  withdrawObligationCollateralAndRedeemReserveCollateralWithMainnet } from "./withdrawObligationCollateralAndRedeemReserveCollateral"



async function main(){
   //console.log("********Devnet********") 
  // await withdrawObligationCollateralInstruction()
   console.log("********Mainnet********") 
   await withdrawObligationCollateralAndRedeemReserveCollateralWithMainnet()

}
main()