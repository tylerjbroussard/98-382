/* 

Class construtor super

*/

console.log(`module 12`);

class Holiday {
  constructor(destination, days) {
    this.destination = destination;
    this.days = days;
  }

  info() {
    console.log(`${this.destination} will take ${this.days} days`);
  }
}

const holiday = new Holiday(`Nepal`, 30);

holiday.info();
