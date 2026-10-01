import * as FileSystem from "expo-file-system/legacy";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const PDF_HTML = (base64: string) => `
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#525659}
canvas{width:100%;display:block;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,.3)}
.page{margin:8px auto}
</style>
</head>
<body>
<div id="viewer"></div>
<script>
var base64 = "${base64}";
var pdfData = base64ToUint8Array(base64);
pdfjsLib.getDocument({data:pdfData}).promise.then(function(pdf){
  for(var i=1;i<=pdf.numPages;i++){
    (function(pageNum){
      pdf.getPage(pageNum).then(function(page){
        var vp=page.getViewport({scale:1.5});
        var c=document.createElement("canvas");
        c.className="page";
        document.getElementById("viewer").appendChild(c);
        c.width=vp.width;c.height=vp.height;
        page.render({canvasContext:c.getContext("2d"),viewport:vp});
      });
    })(i);
  }
});
function base64ToUint8Array(base64){
  var raw=atob(base64);
  var arr=new Uint8Array(raw.length);
  for(var i=0;i<raw.length;i++)arr[i]=raw.charCodeAt(i);
  return arr;
}
</script>
</body>
</html>`;

export default function PtkDocumentViewerScreen() {
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url: string }>();
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const dest = FileSystem.cacheDirectory + "doc.pdf";

    FileSystem.downloadAsync(url, dest)
      .then(({ uri }) =>
        FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        }),
      )
      .then((base64) => setHtml(PDF_HTML(base64)))
      .catch((e) => setError(e.message));
  }, [url]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
        </View>

        {error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : html ? (
          <WebView
            style={{ flex: 1 }}
            source={{ html }}
            javaScriptEnabled
          />
        ) : (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0284C7" />
            <Text style={styles.loadingText}>Memuat dokumen...</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#888",
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
  },
});
