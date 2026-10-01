import * as FileSystem from "expo-file-system/legacy";

export async function fileToBase64(uri: string): Promise<string> {
  let source = uri;
  let tempUri: string | undefined;

  if (uri.startsWith("content://")) {
    tempUri = FileSystem.cacheDirectory + `tmp_b64_${Date.now()}.pdf`;
    await FileSystem.copyAsync({ from: uri, to: tempUri });
    source = tempUri;
  }

  const base64 = await FileSystem.readAsStringAsync(source, {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (tempUri) {
    await FileSystem.deleteAsync(tempUri, { idempotent: true });
  }

  return base64;
}
