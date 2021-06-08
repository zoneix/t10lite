console.log("Codec script loaded..");

let webcam_mode, xcodec, codec;

/*
xcodec = window.xapi.connect('ws://192.172.192.212', {
    username: 'admin',
    password: 'P0p01121',
  })
  .on('error', console.error)
  .on('ready', async (xapi) => {
    /*
    const volume = await xapi.status.get('Audio Volume');
    console.log(`volume is: ${volume}`);
    document.getElementById('log').innerHTML=`${volume}`;
    */
    //xapi.close();

/*
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
      console.log(`Got Webcam Mode: ${value}`);
      value === "Disconnected" ? document.getElementById('webcam_indicator').classList.add('is-danger') : document.getElementById('webcam_indicator').classList.add('is-success');   
    });

    xapi.Status.Video.Output.Webcam.Mode
    .on(value => {
      webcam_mode = value;
      console.log(`Webcam Mode: ${value}`);
      value === "Disconnected" ? document.getElementById('webcam_indicator').classList.replace('is-success', 'is-danger') : document.getElementById('webcam_indicator').classList.replace('is-danger', 'is-success');
    });
    
    xapi.Event.on((event) => {
      console.log(event);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    xapi.Status.Audio.Volume.on((event) => {
      console.log(event);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    xapi.Config.Video.Output.Webcam.USBMode.on((event) => {
      console.log(`USBMode Config:${event}`);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    document.getElementById('webcam_indicator').onclick = function() {
      console.log(webcam_mode);

    };

  });
*/

document.getElementById('authenticate').addEventListener('submit', e =>{
  e.preventDefault();
  codec_connect(
    document.getElementById("ipaddr").value,
    document.getElementById("username").value,
    document.getElementById("pword").value
  );

});

document.getElementById("usb_control").hidden=true;

function codec_connect(i,u,p){
  console.log(`connecting to codec...${i}, ${u}, ${p}`);

  codec = window.xapi.connect(`ws://${i}`, {
    username: u,
    password: p,
  })
  .on('error', (e)=>{
    console.log(e);
    document.getElementById("log").innerHTML=e;
  })
  .on('close', ()=>{
    console.log(`codec connection closed`);
    document.getElementById("log").innerHTML=`Codec connection closed`;
  })
  .on('ready', async (xapi) => {
    /*
    const volume = await xapi.status.get('Audio Volume');
    console.log(`volume is: ${volume}`);
    document.getElementById('log').innerHTML=`${volume}`;
    */
    //xapi.close();

    document.getElementById("codec_form").hidden=true;
    document.getElementById("usb_control").hidden=false;



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
      console.log(`Got Webcam Mode: ${value}`);
      value === "Disconnected" ? document.getElementById('webcam_indicator').classList.add('is-danger') : document.getElementById('webcam_indicator').classList.add('is-success');   
    });

    xapi.Status.Video.Output.Webcam.Mode
    .on(value => {
      webcam_mode = value;
      console.log(`Webcam Mode: ${value}`);
      value === "Disconnected" ? document.getElementById('webcam_indicator').classList.replace('is-success', 'is-danger') : document.getElementById('webcam_indicator').classList.replace('is-danger', 'is-success');
    });
    
    xapi.Event.on((event) => {
      console.log(event);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    xapi.Status.Audio.Volume.on((event) => {
      console.log(event);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    xapi.Config.Video.Output.Webcam.USBMode.on((event) => {
      console.log(`USBMode Config:${event}`);
      document.getElementById('log').innerHTML=`${JSON.stringify(event)}`;
    });

    document.getElementById('webcam_indicator').onclick = function() {
      console.log(webcam_mode);

    };

  });

}

function toggle_usb(){
  console.log(`toggling usb...`);;
}