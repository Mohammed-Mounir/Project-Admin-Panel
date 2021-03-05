import { Address } from './address';


export interface Shipments {
    userID?:String,
    ordersID?: [String],
    deliveryFees?: Number,
    totalPrice?:Number,
    shipmentAddress?: Address,
    deliveryDate?: String,
    paymentMethod?:String,
    shippingCompany?:String
}

