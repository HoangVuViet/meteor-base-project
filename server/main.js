import { spawn } from 'child_process';
import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
function insertLink(title, url) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink('Do the Tutorial', 'https://www.meteor.com/tutorials/react/creating-an-app');

    insertLink('Follow the Guide', 'http://guide.meteor.com');

    insertLink('Read the Docs', 'https://docs.meteor.com');

    insertLink('Discussions', 'https://forums.meteor.com');
  }
});

if (Meteor.isServer) {

  Meteor.methods({

    method1: function (arg) {
      return new Promise((resolve, reject) => {
        // const args = `.\download_landsat.py '2019-01-01' '2019-02-01' (8,102,23,109) "D:/"`
        const downloadBash = spawn(arg[0], ['assets/app/' + arg[1], `${arg[2]}`, `${arg[3]}`, `${arg[4]}`, 40, 30, -80, -70, "DNB", 'E:/err.csv', "E:/APOM_PLATFORM/code/visualization/meteor-base-project/ImageDownload/"]);

        downloadBash.stdout.on(
          'data',
          data => {
            resolve(data.toString())
          }
        );
        downloadBash.stdout.on(
          'error',
          error => {
            reject(error)
          }
        );
      })
    },
    method2: function (arg) {
      return new Promise((resolve, reject) => {
        const processBash = spawn(arg[0], ['assets/app/' + arg[1], `${arg[2].toString()}`, `${arg[3].toString()}`, `'":mod04:Optical_Depth_Land_And_Ocean'`, "E:/APOM_PLATFORM/code/visualization/meteor-base-project/Processing/"]);

        processBash.stdout.on(
          'data',
          data => {
            resolve(data.toString())
          }
        );
        processBash.stdout.on(
          'error',
          error => {
            reject(error)
          }
        );
      })
    },
  });
}
