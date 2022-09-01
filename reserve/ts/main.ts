import { RefreshReserve } from "./refreshReserve"




async function main(){
// Accrue interest and update market price of liquidity on a reserve.
    await RefreshReserve()
}
main()