import {Platform, Page, Storage, SqlStorage} from 'ionic/ionic';


@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
   constructor(platform: Platform) {
         this.platform = platform;
         this.people = [];
         this.platform.ready().then(() => {
         this.storage = new Storage(SqlStorage);
         this.refresh();
        });
    }

    add() {
      this.platform.ready().then(() => {
      console.log("add" + this.firstName);

      this.storage.query("INSERT INTO people (firstname, lastname) VALUES ('" + this.firstName + "','" + this.lastName+"')").then((data) => {
               console.log(JSON.stringify(data.res));
      }, (error) => {
               console.log("ERROR -> " + JSON.stringify(error.err));
        });

      });

   }


  refresh() {
      this.platform.ready().then(() => {
           this.storage.query("SELECT * FROM people").then((data) => {
               this.people = [];
               if(data.res.rows.length > 0) {
                   for(var i = 0; i < data.res.rows.length; i++) {
                       this.people.push({firstname: data.res.rows.item(i).firstname, lastname: data.res.rows.item(i).lastname});
                   }
               }
           }, (error) => {
               console.log("ERROR -> " + JSON.stringify(error.err));
           });
      });
  }
}
