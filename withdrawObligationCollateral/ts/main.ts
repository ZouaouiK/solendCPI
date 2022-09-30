import { withdrawObligationCollateralInstruction, withdrawObligationCollateralInstructionWithMainnet } from "./withdrawObligation"



async function main(){
   //console.log("********Devnet********") 
  // await withdrawObligationCollateralInstruction()
   console.log("********Mainnet********") 
   await withdrawObligationCollateralInstructionWithMainnet()

}
main()