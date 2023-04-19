package com.examples.arganicmolecule2.A7;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.examples.arganicmolecule2.R;

public class ChemAPI_Activity extends AppCompatActivity {
    Button webViewButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chem_api);

        // Wire up the Molecule of the Month button
        Button mtn = (Button) findViewById(R.id.button3);
        mtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent1 = new Intent(ChemAPI_Activity.this, PBD_Date_Activity.class);
                startActivity(intent1);
            }
        });

        // Wire up the Web Service button
        Button web_view_Button = (Button) findViewById(R.id.webview_button);
        web_view_Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent webView_Intent1 = new Intent(ChemAPI_Activity.this, PBD_WebService_Activity.class);
                startActivity(webView_Intent1);
            }
        });


        // Lunch WEB VIEW for Launch WEBVIEW button
        webViewButton=findViewById(R.id.button_for_webView);
        webViewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent webView_intent= new Intent(ChemAPI_Activity.this, PBD_webview_Activity.class);
                startActivity(webView_intent);
            }
        });
    }
}