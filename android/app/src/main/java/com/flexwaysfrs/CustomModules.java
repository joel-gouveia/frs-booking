package com.flexwaysfrs;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.thermalprinter.ThermalPrinterModule;
import com.keyevent.KeyEventModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomModules implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new ThermalPrinterModule(reactContext));
       modules.add(KeyEventModule.initKeyEventModule(reactContext));

       return modules;
   }

}
