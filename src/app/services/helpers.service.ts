import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coordinates, Square,Rover } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  roverUpdated: Rover;

  roverMovement = new BehaviorSubject( {
    direction: 'R',
    coordinates: { xWidth: 11, yHeight: 11 },
    orientation: 'S',
    successTrip: true
    });
    
    public rover$: Observable< Rover | any > = this.roverMovement.asObservable(); // observable that will take care of the rover movement

  constructor() { }

  /*
  checkRoverPosition(width,height,x,y){

    //Ejemplo:
    // width : 0-10
    // height : 0-10
    // x:11 y:4     si esta fuera del rango no funcionaria
    
    if(width >= x && height >= y){
    return true; //Devulevo True -> Estoy dentro del Square
    }else{
    return false; // False -> Rover esta fuera
    }
    
  }
  */
  checkIfInsideSquare(square: Square , coordinates: Coordinates ): boolean {

    const maxWidth = square.width; // The max width of the square will be the width of the square.
    const maxHeight = square.height; // The max height of the square will be the height of the square.
    
    // so we check if coordinates are within those boundaries and also positive number
    return ( coordinates.xWidth <= maxWidth )
    && ( coordinates.yHeight <= maxHeight )
    && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 )
    
    }


    getNewCoordinateWhereIWantToGo(coord:Coordinates, orientacion: 'N' | 'E' | 'S' | 'W'):Coordinates{

      switch(orientacion){
        case 'N':
        coord.yHeight++;
        break;
        case 'E':
        coord.xWidth++;
        break;
        case 'S':
        coord.yHeight--;
        break;
        case 'W':
        coord.xWidth--;
        }
        return coord;
    }



    /*
    changeOrientation(newDirection, orientPrevia){
       // 'N' | 'E' | 'S' | 'W';
    // Direction L, R, A
    // Orientation N W E S
    switch(newDirection){
      case 'L':
        if(orientPrevia == 'N'){
        return 'W';
        }

        if(orientPrevia == 'W'){
        return 'S';
        }

        if(orientPrevia == 'S'){
        return 'E';
        }
        
        if(orientPrevia == 'E'){
        return 'N';
        }
      break;
      case 'R':
      
        if(orientPrevia == 'N'){
        return 'E';
        }

        if(orientPrevia == 'E'){
        return 'S';
        }

        if(orientPrevia == 'S'){
        return 'W';
        }

        if(orientPrevia == 'W'){
        return 'N';
        }
        break;

      case 'A':
        return orientPrevia;
      }


}
*/




changeOrientation( direction: 'L' | 'R' | 'A' , orientation: 'N' | 'S' | 'E' | 'W' ): 'N' | 'S' | 'E' | 'W' {
  // we assume the rover can only change orientation when he receives either Left (L) or Right (R) Direction
  
  // const arrayOrientations = ['N', 'E', 'S', 'W'];
  
  if( ( direction === 'L' ) || ( direction === 'R') ){
  switch(orientation) {
  
  case 'N': {
  if( direction === 'L'){
  return 'W'
  }else {
  // can only be 'R'
  return 'E'
  }
  }
  case 'S': {
  if( direction === 'L'){
  return 'E'
  }else{
  // can only be 'R'
  return 'W'
  }
  }
  case 'E': {
  if( direction === 'L'){
  return 'N'
  }else{
  // can only be 'R'
  return 'S'
  }
  }
  case 'W': {
  if( direction === 'L'){
  return 'S'
  }else{
  // can only be 'R'
  return 'N'
  }
  }
  }
  
  }else{
  return orientation //// FUNCION PARA CAMBIAR LA PO
  }
  }

  /*
  checkValidMovement(rover:Rover, square:Square,direccion:'L'|'R'|'A'){
    
    
    const roverCoord = rover.coordinates;
    const orientacion = rover.orientation;
    
    //direccion: L

    
    if(direccion != 'A'){
      const newOrient = this.changeOrientation(direccion,orientacion);
      }else{
      const newPosition = this.getNewCoordinateWhereIWantToGo(roverCoord,orientacion);
      const valid = this.checkIfInsideSquare(square,newPosition);
      return valid;
      }


  }

  */

  moveRover( rover: Rover , direction: 'L' | 'R' | 'A' , square: Square ): Rover {
    // I receive an order of type direction;
    // 1. I change the orientation of the rover;
    if( direction === 'L' || direction === 'R') {
    
    rover.orientation = this.changeOrientation(direction, rover.orientation) as 'N' | 'S' | 'W' | 'E'
    console.log('rover', rover);
    
    
    return rover
    
    }else{
    // I want to check first if is possible to go there;
    
    const targetCoordinates = this.getNewCoordinateWhereIWantToGo(rover.coordinates, rover.orientation);
    
    if( this.checkIfInsideSquare(square, targetCoordinates)){
    
    // is allowed to go so let's execute the method move;
    rover['coordinates'] = targetCoordinates;
    
    console.log('ROVER', rover);
    rover.successTrip = true
    return rover
    }else{
    rover.successTrip = false
    return rover
    }
    }
    }


    
/// L, L, L, L , A, A, A, R, A , R, L, A


async trip( directions: string[], rover: Rover, square: Square){

 
  // we use a promise to track all the steps since we add some delay effect

  let roverUpdated:Rover = rover;

  // primera iteración tendra que pasar en el milisegundo 400
  // segunda iteración tendra que pasar en el milisegundo 800
  // tercera iteración tendra que pasar en el milisegundo 1200

  if(rover.successTrip){

    directions.forEach((direction: 'L' | 'R' | 'A', i )=>{
  
      setTimeout(()=>{
        this.roverMovement.next( roverUpdated )
       this.moveRover(rover,direction,square)
        }, i*1000);
        
        
      
    });
  
      

  }else{
    return this.roverUpdated = rover; 
  }





}

}
