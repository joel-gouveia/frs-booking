package com.keyevent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;

import com.facebook.react.module.annotations.ReactModule;

import androidx.annotation.NonNull;

import android.view.KeyCharacterMap;
import android.view.KeyEvent;

@ReactModule(name = KeyEventModule.NAME)  
public class KeyEventModule extends ReactContextBaseJavaModule {
    public static final String NAME = "KeyEventModule";
    private ReactContext mReactContext;
    private DeviceEventManagerModule.RCTDeviceEventEmitter mJSModule = null;
    private static KeyEventModule instance = null;

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    public static KeyEventModule initKeyEventModule(ReactApplicationContext reactContext) {
        instance = new KeyEventModule(reactContext);
        return instance;
    }

    public static KeyEventModule getInstance() {
        return instance;
    }

    public void onKeyDownEvent(int keyCode, KeyEvent keyEvent) {
        if (!mReactContext.hasActiveCatalystInstance()) {
            return;
        }

        if (mJSModule == null) {
            mJSModule = mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mJSModule.emit("onKeyDown", getJsEventParams(keyCode, keyEvent, null));
    };

    public void onKeyUpEvent(int keyCode, KeyEvent keyEvent) {
        if (!mReactContext.hasActiveCatalystInstance()) {
            return;
        }

        if (mJSModule == null) {
            mJSModule = mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        mJSModule.emit("onKeyUp", getJsEventParams(keyCode, keyEvent, null));
    };

    protected KeyEventModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    private WritableMap getJsEventParams(int keyCode, KeyEvent keyEvent, Integer repeatCount) {
        WritableMap params = new WritableNativeMap();

        int action = keyEvent.getAction();
        char keyCharacter = (char) keyEvent.getUnicodeChar();

        String actionName = this.actionToString(action);
        String keyName = KeyEvent.keyCodeToString(keyCode);

        params.putInt("keyCode", keyCode);
        params.putString("actionName", actionName);
        params.putString("keyCharacter", String.valueOf(keyCharacter));
        params.putString("keyName", keyName);

        return params;
    }

    public static String actionToString(int action) {
        switch (action) {
            case KeyEvent.ACTION_DOWN:
                return "ACTION_DOWN";
            case KeyEvent.ACTION_UP:
                return "ACTION_UP";
            default:
                return Integer.toString(action);
        }
    }
}
