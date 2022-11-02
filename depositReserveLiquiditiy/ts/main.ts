import { depositReserveLiquitiy, depositReserveLiquitiyWithMainnet } from "./depositReserveLiquitiy"




async function main(){
// Deposit liquidity into a reserve in exchange for collateral. Collateral represents a share of the reserve liquidity pool.

//console.log("********************************* devnet***************")
    //await depositReserveLiquitiy()
    console.log("********************************* mainnet***************")
    await depositReserveLiquitiyWithMainnet()
}
main()