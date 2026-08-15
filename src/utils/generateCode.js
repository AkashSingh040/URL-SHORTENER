//we need utility to genrate shortcode for our shortened url
/*
generic utility function ( just I/O ) clean separation of concern reason
Original URL:
https://example.com/some/very/long/path

Generated shortCode:
aB92xK

*/

// Only Generate a random short string is its responsibility
// Character set we are using is { a-z ,A-Z,0-9}
//GIVES possible pow(62,6) looking of combination of 6 => 56,800,235,584 (56.8 billions) possible combination enough for us

const crypto =require("crypto");

const CHARACTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const CODE_LENGTH=6;

const generateCode = ()=>{
    let code="";
    for(let i=0;i<CODE_LENGTH;++i){
        const randomIndex= crypto.randomInt(0,CHARACTERS.length);//its better random source than Math.random()
        code+=CHARACTERS[randomIndex];
    }
    return code;
}

module.exports=generateCode;

//how it works :-
// generateCode()
//       ↓
// random character
//       ↓
// random character
//       ↓
// random character
//       ↓
// random character
//       ↓
// random character
//       ↓
// random character
//       ↓
// "aB92xK"


//generated random code may be same as previous but its not responsibility of this function but service layer will handle it