package com.listacompras.app;

import android.app.Activity;
import android.content.res.Configuration;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setDatabaseEnabled(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMediaPlaybackRequiresUserGesture(false);

        boolean isDark = (getResources().getConfiguration().uiMode
                & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript("window.__androidDarkMode = " + isDark + ";", null);
            }
        });

        webView.loadUrl("file:///android_asset/public/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView == null) { super.onBackPressed(); return; }
        webView.evaluateJavascript(
            "(function(){" +
            "  if(typeof window.__androidBack==='function'){" +
            "    var wasOpen=window.__drawerOpen===true;" +
            "    window.__androidBack();" +
            "    var nowOpen=window.__drawerOpen===true;" +
            "    if(wasOpen&&!nowOpen) return 'minimize';" +
            "    return 'handled';" +
            "  }" +
            "  return 'default';" +
            "})()",
            result -> {
                if(result==null||result.equals("\"minimize\"")||result.equals("\"default\"")){
                    runOnUiThread(()->MainActivity.super.onBackPressed());
                }
            }
        );
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        boolean isDark = (newConfig.uiMode & Configuration.UI_MODE_NIGHT_MASK)
                == Configuration.UI_MODE_NIGHT_YES;
        if (webView != null) {
            webView.evaluateJavascript(
                "window.__androidDarkMode="+isDark+";" +
                "window.dispatchEvent(new Event('androidDarkModeChange'));", null);
        }
    }
}
