import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };
handleBarcodeScanned=async({type,data})=>{
  this.setState({
    scannedData:data,
    domState:"normal",
    scanned:true,

  })
}
  render() {
    const {domState,scanned,hasCameraPermissions,scannedData}=this.state

if (domState==="scanner"){
  return(
    <BarCodeScanner
    onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
    style={StyleSheet.absoluteFillObject}></BarCodeScanner>
  )
}

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions?scannedData:"request for camera permission"}
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
 
});
