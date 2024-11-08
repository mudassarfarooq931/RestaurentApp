package com.restaurantapp

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity

@SuppressLint("CustomSplashScreen")
class SplashActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val intent = Intent(this, MainActivity::class.java)
        val extras = intent.extras
        if (extras != null) {
            intent.putExtras(extras)
        }
        startActivity(intent)
        finish()
    }
}