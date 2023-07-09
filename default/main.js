//Includes 
var roleGatherer = require('role.Gatherer');
var roleUpgrader = require('role.Builder');
var roleBuilder = require('role.Miner');

//Setting up variables in the memory


//Main loop
module.exports.loop = function () {
    if(!Game.time%10){
        console.log(Game.time);
        Game.spawns['Spawn1'].memory.numberOfGatherer=3;
        Game.spawns['Spawn1'].memory.numberOfBuilders=2;
        Game.spawns['Spawn1'].memory.numberOfUpgraders=1;
        Game.spawns['Spawn1'].memory.myRooms=['sim'];
        var avaiableSource = Game.rooms['sim'].energyCapacityAvailable;
        var Body=[];
        var numberOfBodyParts = (avaiableSource-100)/50;
        for(var i=0; i<numberOfBodyParts/3; i+=3)
        {
            Body[i]=WORK;
            Body[i+1]=CARRY;
            Body[i+2]=MOVE;
        }
        for(var i=0; i<numberOfBodyParts%3;++i)
        {
            Body[i+Body.length]=MOVE;
        }
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer');
        console.log('Gatherer: ' + harvesters.length);
        if(harvesters<Game.spawns['Spawn1'].memory.numberOfGatherer)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Gatherer'+Game.time,{memory:{role:"gatherer"}});
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builder: ' + harvesters.length);
        elif(harvesters<Game.spawns['Spawn1'].memory.numberOfGatherer)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Builder'+Game.time,{memory:{role:"builder"}});
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgrader: ' + harvesters.length);
        elif(harvesters<Game.spawns['Spawn1'].memory.numberOfGatherer)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Upgrader'+Game.time,{memory:{role:"upgrader"}});
        }
    }


    var tower = Game.getObjectById('e60316bfcc3a253f9cb92688');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'gatherer') {
            roleGatherer.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}