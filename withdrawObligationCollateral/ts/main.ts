import { withdrawObligationCollateralInstruction, withdrawObligationCollateralInstructionWithMainnet } from "./withdrawObligation"



async function main(){

   console.log("********Mainnet********") 
   await withdrawObligationCollateralInstructionWithMainnet()

}
main()