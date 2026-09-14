import Cart from "./Cart";
import Notif from "./Notif";
import Register from "./Register";

const User = () => {
    return ( <div className="flex justify-center items-center gap-4">
        <Notif/>
        <Register/>
        <Cart/>
    </div> );
}
 
export default User;