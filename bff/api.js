const express = require('express');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
app.use(express.json());

const { BlobServiceClient } = require("@azure/storage-blob");

const connStr = process.env.connStr;
const blobServiceClient = connStr ? BlobServiceClient.fromConnectionString(connStr) : undefined ;

const containerName = "plantiottelemtrydata";
const lifeBlob = "plantsHub/life.json";

let telementryData = [{
  "deviceId":"Sven's Sensor",
  "analogSoil":500
},
{
  "deviceId":"Melanie's Sensor",
  "analogSoil":400
},
{
  "deviceId":"Richard's Sensor",
  "analogSoil":100
},
{
  "deviceId":"Ton's Sensor",
  "analogSoil":763
}];

// [Node.js only] A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

async function downloadLifeDataFromBlob(blob) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blob);

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  const downloadBlockBlobResponse = await blobClient.download();
  const downloaded = (
    await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
  ).toString();
  return downloaded;
}

async function setHistoryData() {
  let histroyData = [];
  const containerClient = blobServiceClient.getContainerClient(containerName);

  let i = 1;
  let blobs = containerClient.listBlobsFlat();
  let filesToParse=[];
  const today = new Date();
  let tempData;

  for await (const blob of blobs) {
    if(blob.name.includes(`${today.getFullYear()}/${("0" + (today.getMonth() + 1)).slice(-2)}/${("0" + today.getDate()).slice(-2)}`)){
      filesToParse.push(blob.name);
    }
  }
  const asyncRes = await Promise.all(filesToParse.map(async (blobName) => {
    tempData = await downloadLifeDataFromBlob(blobName);
    tempData = tempData.split("\n").map(x=>JSON.parse(x));
    tempData.forEach(data =>{
      let deviceIndex = histroyData.findIndex((element) =>{
        return element.deviceId === data.SystemProperties.connectionDeviceId;
      });

      if(deviceIndex === -1) {
        histroyData.push({
            deviceId: data.SystemProperties.connectionDeviceId,
            telemetry: [
              {
                ...data.Body,
                date: data.EnqueuedTimeUtc,
              }
            ]
        })
      } else {
        histroyData[deviceIndex].telemetry.push(
          {
            ...data.Body,
            date: data.EnqueuedTimeUtc,
          }
        )
      }
    })
  }));
  return histroyData;
}

app.get('/getLifeData', async (req, res, next) =>{
  if(blobServiceClient){
    // dirty i know will fix later got excited :D
    res.send(JSON.parse(await downloadLifeDataFromBlob(lifeBlob)));
  } else {
    res.send(telementryData);
  };
});

app.get('/getHistory', async (req, res, next) =>{
  let response = await setHistoryData();
  res.send(response);
});

app.get('/date', async (req, res, next) =>{
  res.send(new Date());
});


module.exports = app