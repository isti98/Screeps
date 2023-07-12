//Includes 
var roleGatherer = require('role.Gatherer');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCarry = require('role.Carry');
var roleMiner = require('role.Miner');

//Setting up variables in the memory


//Main loop
module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    console.log(Game.time);
    if(Game.time%10==0){
        Game.spawns['Spawn1'].memory.numberOfGatherers=1;
        Game.spawns['Spawn1'].memory.numberOfBuilders=2;
        Game.spawns['Spawn1'].memory.numberOfUpgraders=0;
        Game.spawns['Spawn1'].memory.myRooms=['W56N17'];
        var avaiableSource = Game.rooms['W56N17'].energyCapacityAvailable;
        console.log("AvaibleSources: "+ avaiableSource);
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
            Body[i+Body.length]=WORK;
        }
        console.log("Body: "+Body);
        var gatherers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer')).length;
        console.log('Gatherer: ' + gatherers.length+" < "+Game.spawns["Spawn1"].memory.numberOfGatherers);
        var upgraders = (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')).length;
        console.log('Upgrader: ' + upgraders.length+" < "+Game.spawns["Spawn1"].memory.numberOfUpgraders);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        console.log('Builder: ' + builders.length+" < "+Game.spawns["Spawn1"].memory.numberOfBuilders);
        console.log(gatherers<Game.spawns['Spawn1'].memory.numberOfGatherers);
        if(gatherers<Game.spawns['Spawn1'].memory.numberOfGatherers)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Gatherer'+Game.time,{memory:{role:"gatherer"}});
        }
        else if(builders<Game.spawns['Spawn1'].memory.numberOfBuilders)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Builder'+Game.time,{memory:{role:"builder"}});
        }
        else if(upgraders<Game.spawns['Spawn1'].memory.numberOfUpgraders)
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
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'carry') {
            roleCarry.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
    }
}