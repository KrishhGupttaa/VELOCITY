import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="bg-[#F9F9F9] min-h-screen py-16">
      <div className="max-w-[1440px] mx-auto px-6" data-testid="cart-container">
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter uppercase text-black mb-12">
          Your Cart
        </h1>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            <div className="flex flex-col bg-white rounded-xl shadow-sm p-8 gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-28 bg-white rounded-xl shadow-sm p-8">
                {cart && cart.region && (
                  <Summary cart={cart} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-16 flex flex-col items-center justify-center min-h-[50vh]">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
