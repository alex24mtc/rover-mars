import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../services/helpers.service';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

constructor(
private helpers: HelpersService
) {}

ngOnInit(){

this.helpers.trip(

[ 'A' , 'A', 'L', 'A' , 'A'] , /// array de instrucciones

{
direction: 'A',
orientation: 'N',
coordinates: {
xWidth: 1,
yHeight: 1
},
successTrip: true // objeto rover inicial
},


/// tercer parametro que son las dimensiones del cuadrado
{
width: 200,
height: 200
})
}

}

