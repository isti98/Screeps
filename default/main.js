//Includes 
var roleGatherer = require('role.Gatherer');
var roleUpgrader = require('role.Upgrader');
var roleBuilder = require('role.Builder');
var roleCarry = require('role.Carry');
var roleMiner = require('role.Miner');
var creepSpawning = require('creepSpawning');

//Setting up variables in the memory

//Main loop
module.exports.loop = function () {
    Game.spawns['Spawn1'].memory.numberOfGatherers=0;
    Game.spawns['Spawn1'].memory.numberOfBuilders=1;
    Game.spawns['Spawn1'].memory.numberOfUpgraders=1;
    Game.spawns['Spawn1'].memory.numberOfMiners=1;
    Game.spawns['Spawn1'].memory.numberOfCarries=2;
    Game.spawns['Spawn1'].memory.mines=['5bbca9fe9099fc012e6308a0','5bbca9fe9099fc012e6308a1'];
    Game.spawns['Spawn1'].memory.ticksLeft=[0,0];
    Game.spawns['Spawn1'].memory.myRooms=['E22S19'];

    for(var i=0; i<Game.spawns['Spawn1'].memory.mines.length;++i)
    {
        Game.spawns['Spawn1'].memory.ticksLeft[i]-=1;
    }

    console.log(Game.time);

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(Game.time%10==0){        
        var avaiableSource = Game.rooms[Game.spawns['Spawn1'].memory.myRooms[0]].energyCapacityAvailable;
        console.log("AvaibleSources: "+ avaiableSource);
        var BodyMiner=[];
        var BodyCarry=[CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
        var Body=[];
        var numberOfBodyParts = (avaiableSource)/100;
        var i;
        for(i=0; i<numberOfBodyParts-1.5; ++i)
        {
            Body[i]=WORK;
            BodyMiner[i]=WORK;
        }
        Body[i]=MOVE;
        Body[0]=CARRY;
        BodyMiner[i]=MOVE;
        console.log(BodyMiner);
        var gatherers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer')).length;
        console.log('Gatherer: ' + gatherers+" < "+Game.spawns["Spawn1"].memory.numberOfGatherers);
        var upgraders = (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')).length;
        console.log('Upgrader: ' + upgraders+" < "+Game.spawns["Spawn1"].memory.numberOfUpgraders);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        console.log('Builder: ' + builders+" < "+Game.spawns["Spawn1"].memory.numberOfBuilders);
        var carries = (_.filter(Game.creeps, (creep) => creep.memory.role == 'carry')).length;
        console.log('Carries: ' + carries+" < "+Game.spawns["Spawn1"].memory.numberOfCarries);
        var miners = (_.filter(Game.creeps, (creep) => creep.memory.role == 'miner')).length;
        console.log('Miners: ' + miners+" < "+Game.spawns["Spawn1"].memory.numberOfMiners);
        
        if(carries<Game.spawns['Spawn1'].memory.numberOfCarries)
        {
            Game.spawns["Spawn1"].spawnCreep(BodyCarry,'Carry'+Game.time,{memory:{role:"carry"}});
        }
        else if(miners<Game.spawns['Spawn1'].memory.numberOfMiners)
        {   
            var attachTo;
            var size=Game.spawns['Spawn1'].memory.ticksLeft.length;
            var i=0;
            while(i<size && (Game.spawns['Spawn1'].memory.ticksLeft[i]>0)){
                ++i;
            }
            if(i<size){
                attachTo=Game.spawns['Spawn1'].memory.mines[i];
                Game.spawns['Spawn1'].memory.ticksLeft[i]=1500;
            }
            console.log('sdfsdfasdfasdfa : '+attachTo);
            Game.spawns['Spawn1'].spawnCreep(BodyMiner,'Miner'+Game.time,{memory:{role: 'miner', attachTo: attachTo}});
        }
        else if(upgraders<Game.spawns['Spawn1'].memory.numberOfUpgraders)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Upgrader'+Game.time,{memory:{role:"upgrader"}});
        }
        else if(gatherers<Game.spawns['Spawn1'].memory.numberOfGatherers)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Gatherer'+Game.time,{memory:{role:"gatherer"}});
        }
        else if(builders<Game.spawns['Spawn1'].memory.numberOfBuilders)
        {
            Game.spawns["Spawn1"].spawnCreep(Body,'Builder'+Game.time,{memory:{role:"builder"}});
        }
    }


    var tower = Game.getObjectById('64b7eaed34d3a0d0371d8efe');
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