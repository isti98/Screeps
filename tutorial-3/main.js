var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var screepsCounter=0;
var shallBuild=false;

module.exports.loop = function () {
    
    if(Game.spawns["Spawn1"].energyCapacity >= 200 && shallBuild)
    {
        if(screepsCounter%2==0)
        {
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'h'+screepsCounter,     { memory: { role: 'harvester' } } );
        }
        else{
            Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'b'+screepsCounter,     { memory: { role: 'builder' } } );    
        }
        ++screepsCounter;
    }
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}