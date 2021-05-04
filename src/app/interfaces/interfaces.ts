export interface Square {
    width:number;
    height:number;
}

export interface Coordinates{
    xWidth:number;
    yHeight:number;
}


export interface Rover{
    direction: 'L' | 'R' | 'A' //Direction;
    orientation: 'N' | 'E' | 'S' | 'W';
    cooordinates:Coordinates; //initial coordinates
    successTrip: boolean; //indicates if its was succesfull trip or not
}