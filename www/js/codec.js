console.log("Codec script loaded..");
/*
window.onload = function() {
  window.setTimeout(fadeout, 6000); //8 seconds
}

function fadeout() {
  document.getElementById('log').style.opacity = '0';
}
*/

let webcam_mode, xcodec, codec, incall = false;

document.getElementById('authenticate').addEventListener('submit', e =>{
  e.preventDefault();
  codec_connect(
    document.getElementById("ipaddr").value,
    document.getElementById("username").value,
    document.getElementById("pword").value
  );
});

//document.getElementById("usb_control").hidden=true;

document.getElementById('dial_button').addEventListener('click', e =>{
  e.preventDefault();
  console.log(document.getElementById("sipuri").value);
  codec.Command.Dial({Number: `${document.getElementById("sipuri").value}`});
});

//codec.Command.Call.Disconnect()
document.getElementById('hangup_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Call.Disconnect();
});

//codec.Command.Call.Reject()
document.getElementById('decline_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Call.Reject();
});

//codec.Command.Call.Accept();
document.getElementById('accept_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Call.Accept();
});

//Mute toggle
document.getElementById('mute_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Audio.Microphones.ToggleMute();
});

//Volume
document.getElementById('vol_up_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Audio.Volume.Increase();
});
document.getElementById('vol_dn_button').addEventListener('click', e =>{
  e.preventDefault();
  codec.Command.Audio.Volume.Decrease();
});

//Disconnect
document.getElementById('bolt').addEventListener('click', e =>{
  e.preventDefault();
  codec.close();
});

function codec_connect(i,u,p){
  console.log(`connecting to codec...${i}, ${u}, ${p}`);

  codec = window.xapi.connect(`ws://${i}`, {
    username: u,
    password: p,
  })
  .on('error', (e)=>{
    console.log(e);
    document.getElementById("log").innerHTML=e;
    document.getElementById("authenticate").classList.remove('is-hidden');
    document.getElementById("usb_tab").classList.add('is-hidden');
    document.getElementById("make_call_tab").classList.add('is-hidden');
    document.getElementById("bolt").classList.add('is-hidden');
  })
  .on('close', ()=>{
    console.log(`codec connection closed`);
    document.getElementById("log").innerHTML=`Codec connection closed`;
    document.getElementById("authenticate").classList.remove('is-hidden');
    document.getElementById("usb_tab").classList.add('is-hidden');
    document.getElementById("make_call_tab").classList.add('is-hidden');
    document.getElementById("bolt").classList.add('is-hidden');
  })
  .on('ready', async (xapi) => {

    document.getElementById("authenticate").classList.add('is-hidden');
    document.getElementById("usb_tab").classList.remove('is-hidden');
    document.getElementById("make_call_tab").classList.remove('is-hidden');
    document.getElementById("bolt").classList.remove('is-hidden');
  
    xapi.Status.Audio.Microphones.Mute
    .on(value => {
      console.log(`Microphone Mute: ${value}`);
      document.getElementById('log').innerHTML=`Mute: ${value}`;
      if (value === 'On'){
        document.getElementById('mute_button').innerHTML=`Unmute`;
        document.getElementById('mute_button').classList.replace('is-light', 'is-danger');

      } else if (value === 'Off'){
        document.getElementById('mute_button').innerHTML=`Mute`;
        document.getElementById('mute_button').classList.replace('is-danger', 'is-light');
      }
    });

    xapi.Status.Audio.Volume
    .get()
    .then(value => {
      console.log(`Got Volume: ${value}`);
      document.getElementById('log').innerHTML=`Volume: ${value}`;
    });

    xapi.Config.Video.Output.Webcam.USBMode
    .get()
    .then(value => {
      console.log(`Got USBMode: ${value}`);
    });

    xapi.Status.Video.Output.Webcam.Mode
    .get()
    .then(value => {
      webcam_mode = value;
      document.getElementById('log').innerHTML=`Webcam Mode: ${value}`;
      value === "Disconnected" ? document.getElementById('usb_button').classList.add('is-danger') : document.getElementById('usb_button').classList.add('is-success');   
    });

    xapi.Status.Video.Output.Webcam.Mode
    .on(value => {
      webcam_mode = value;
      document.getElementById('log').innerHTML=`Webcam Mode: ${value}`;
      value === "Disconnected" ? document.getElementById('usb_button').classList.replace('is-success', 'is-danger') : document.getElementById('usb_button').classList.replace('is-danger', 'is-success');
      if (value === "Streaming"){
        document.getElementById("make_call_tab").classList.add('is-hidden');
        document.getElementById('log').innerHTML=`Using device as external webcam`;
      } else if (!incall) {
        document.getElementById("make_call_tab").classList.remove('is-hidden');
        document.getElementById('log').innerHTML=``;
      }
       
    });
    
    xapi.Event.CallSuccessful
    .on((event) => {
      console.log(`Call successfully connected`);
      document.getElementById("make_call_tab").classList.add('is-hidden');
      document.getElementById("in_call_tab").classList.remove('is-hidden');
      document.getElementById("accept_call_tab").classList.add('is-hidden');
      document.getElementById('log').innerHTML=` Answered call ${JSON.stringify(event.CallId)}`;
      incall = true;
    });

    xapi.Event.CallDisconnect
    .on((event) => {
      console.log(`Call successfully disconnected`);
      document.getElementById("make_call_tab").classList.remove('is-hidden');
      document.getElementById("in_call_tab").classList.add('is-hidden');
      document.getElementById("accept_call_tab").classList.add('is-hidden');
      //document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
      document.getElementById('log').innerHTML=`Call successfully disconnected`;
      incall = false;
    });

 

    xapi.Event.IncomingCallIndication
    .on((event) => {
      console.log(`Inbound call from ${JSON.stringify(event.DisplayNameValue)}`);
      document.getElementById("make_call_tab").classList.add('is-hidden');
      document.getElementById("in_call_tab").classList.add('is-hidden');
      document.getElementById("accept_call_tab").classList.remove('is-hidden');
      document.getElementById('log').innerHTML=`Inbound call from: ${JSON.stringify(event.DisplayNameValue)}`;
      incall = true;
    });

    xapi.Event.OutgoingCallIndication
    .on((event) => {
      console.log(`Outbound call in progress`);
      document.getElementById("make_call_tab").classList.add('is-hidden');
      document.getElementById("in_call_tab").classList.remove('is-hidden');
      document.getElementById('log').innerHTML=`Outbound call ${JSON.stringify(event.CallId)} in progress...`;
      incall = true;
    });

    
    xapi.Event.on((event) => {
      console.log(event);
      //document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });
    

    xapi.Status.Audio.Volume.on((event) => {
      console.log(event);
      document.getElementById('log').innerHTML=`Volume: ${JSON.stringify(event)}`;
    });

    xapi.Config.Video.Output.Webcam.USBMode.on((event) => {
      console.log(`USBMode Config:${event}`);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    document.getElementById('usb_button').onclick = function() {
      console.log(webcam_mode);

    };

  });

}

function toggle_usb(){
  console.log(`toggling usb...`);;
}