import { NativeModules } from "react-native";
import AppleHealthKit from "react-native-health";
export const Health = NativeModules.AppleHealthKit as typeof AppleHealthKit;