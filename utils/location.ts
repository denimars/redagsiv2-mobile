import * as Location from "expo-location";

async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }
}

export async function getCurrentLocation() {
  await requestLocationPermission();

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy,
  };
}

function convertToRadian(radian: number) {
  return radian * (Math.PI / 180);
}

export function convertLatLongToKm(
  lat: number,
  lon: number,
  pos_lat: number,
  pos_lon: number,
): number {
  const R = 6371;
  const dLat = convertToRadian(pos_lat - lat);
  const dLon = convertToRadian(pos_lon - lon);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(convertToRadian(lat)) *
      Math.cos(convertToRadian(pos_lat)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
