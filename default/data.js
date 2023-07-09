var lifecycle= 1500;
var gameData = {
    costOfCreep:function(body)
    {
        /*
        "move": 50, 
        "work": 100,
        "attack": 80,
        "carry": 50,
        "heal": 250, 
        "ranged_attack": 150,
        "tough": 10, 
        "claim": 600 
        */
        var cost=0;
        for( var name in body){
            var part= body[name];
            if(part == MOVE){
                cost+=50;
            }else if(part == WORK){
                cost+=100;
            }else if(part == CARRY){
                cost+=50;
            }
        }
        return cost;
    }
    
}
module.exports = gameData;