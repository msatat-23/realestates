'use client'
import PropertyClient from "./propertyClient";
import { useParams } from "next/navigation";
const PropertyDetails =() => {
    const params=useParams();
    const id = params.id;

    console.log("Property ID:", id);



    return (
        <PropertyClient id={id} />
    );
};
export default PropertyDetails;

