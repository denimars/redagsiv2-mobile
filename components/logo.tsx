import { Image } from "expo-image";

interface LogoProps {
    width?: number;
    height?: number;
}

export default function Logo({ width = 120, height = 120 }: LogoProps){
    return (
        <Image 
            source={require('../assets/images/abuhur-logo.webp')} 
            contentFit="cover" 
            style={{ width, height }} 
        />
    )
}

