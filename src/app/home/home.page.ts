import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  display='0';
  firstval: number = null;
  operator: any = null;
  newcursor = false;
  isc = false;
  iscomma = false;

  click(val: any){
    switch(val){
      case'ac':
      this.display = '0';
      this.firstval = null;
      this.operator = null;
      this.newcursor = null;
      break;
      case'c':
      this.display = '0';
      this.isc = false;
      break;
      case'+/-':
      if( Math.sign(parseInt(this.display,0)) === 1){
        const sign = -Math.abs(parseInt(this.display,0));
        this.display = sign.toString();
      }else if ( Math.sign(parseInt(this.display,0)) === -1){
        const sign = Math.abs(parseInt(this.display,0));
        this.display = sign.toString();
      }else{
        this.display = this.display;
      }
      break;
      case'%':
      this.addpercent();
      break;
      case'/':
      this.addoperator('/');
      break;
      case'X':
      this.addoperator('X');
      break;
      case'-':
      this.addoperator('-');
      break;
      case'+':
      this.addoperator('+');
      break;
      case'=':
      if (this.firstval !== null && this.operator !== null){
        this.calculate();
      }
      this.operator = null;
      break;
      case'0':
      this.addnumber('0');
      break;
      case'1':
      this.addnumber('1');
      break;
      case'2':
      this.addnumber('2');
      break;
      case'3':
      this.addnumber('3');
      break;
      case'4':
      this.addnumber('4');
      break;
      case'5':
      this.addnumber('5');
      break;
      case'6':
      this.addnumber('6');
      break;
      case'7':
      this.addnumber('7');
      break;
      case'8':
      this.addnumber('8');
      break;
      case'9':
      this.addnumber('9');
      break;
      case',':
      this.addcomma();
      break;
    }

  }
  addcomma() {
    if(this.iscomma === false){
      this.iscomma = true;
    }else {
      this.iscomma = false;
    }
  }
  addnumber(num: string) {
    if( num === '0' ){
      if (this.newcursor === true){
        this.display = num;
        this.newcursor = false;
      }else if (this.display !== '0'){
        if(this.iscomma == true){
          this.display = '${this.display.toString()}.${num}';
        }else{
          this.display = this.display.toString()+num;
        }
      }else if (this.display === '0'){
        if(this.iscomma == true){
          this.display = '${this.display.toString()}.${num}';
        }
      }
    }else{
      if(this.newcursor === true){
        this.display = num;
        this.newcursor = false;
      }else if (this.display === '0'){
        if (this.iscomma === true){
          if(this.display.toString().indexOf('.') > -1){
            this.display = this.display.toString() + num;
          }else{
            this.display = '${this.display.toString()}.${num}';
          }
        }else{
          this.display = num;
        }
      }else{
        if(this.iscomma === true){
          if(this.display.toString().indexOf('.') > -1){
            this.display = this.display.toString() + num;
          }else{
            this.display = '${this.display.toString()}.${num}';
          }
        }else{
          this.display = this.display.toString() + num;
        }
      }
    }
    this.isc = true;
  }
  calculate() {
    switch(this.operator){
      case'/':
      if(this.iscomma === true){
        this.firstval = (this.firstval / parseFloat(this.display));
      }else{
        this.firstval = (this.firstval / parseInt(this.display,0));
      }
      break;
      case'X':
      if(this.iscomma === true){
        this.firstval = (this.firstval * parseFloat(this.display));
      }else{
        this.firstval = (this.firstval * parseInt(this.display,0));
      }
      break;
      case'-':
      if(this.iscomma === true){
        this.firstval = (this.firstval - parseFloat(this.display));
      }else{
        this.firstval = (this.firstval - parseInt(this.display,0));
      }
      break;
      case'+':
      if(this.iscomma === true){
        this.firstval = (this.firstval + parseFloat(this.display));
      }else{
        this.firstval = (this.firstval + parseInt(this.display,0));
      }
      break;
    }
    this.display = this.firstval.toString();
  }
  addoperator(operator: string) {
    if(this.newcursor === false){
      if(this.firstval === null){
        if(this.iscomma === true){
          this.firstval = parseFloat(this.display);
        }else{
          this.firstval = parseInt(this.display,0);
        }
      }
      if(this.firstval !== null && this.operator !== null){
        this.calculate();
      }
    }

    this.iscomma = false;
    this.operator = operator;
    this.newcursor = true;
  }
  addpercent() {
    this.iscomma = false;
    const disp = parseInt(this.display,0) / 100;
    this.display = disp.toString();
  }

}
