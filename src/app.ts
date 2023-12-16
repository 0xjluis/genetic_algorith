console.log("**********************************")

const mutationProb = 0.002;
const crossOverProb = 0.6; 
const bitesLength = 35;
const discoverThis = "01010111011100100100000100111111000";


interface PopulationFit{
	chromosome: string,
	fitness:number
}

interface PopulationGroup {
	fitness:number,
	chromosomes: string[],
	probability: number
}


function  generate(length: number):PopulationFit[] {
    let population:PopulationFit[] = []

    for(let i=0; i< length;i++){
    	let chromosome:string[] = [];

	    for(let i=0; i<bitesLength; i++){
	    	let gen = Math.floor(Math.random() * Math.floor(2));
	    	chromosome.push(gen.toString());
	    }

	    let fitness = calFitness(chromosome.join(''));

	    let chromosomeFitness:PopulationFit = {
    		chromosome: chromosome.join(''),
			fitness: fitness
    	}

	    population.push(chromosomeFitness);
    }

    return population;
}	


function calFitness(chromosome:string){
	let result = [...discoverThis];
	let test = [...chromosome];

	let score = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i] === test[i]) {
            score++;
        }
    }

    return score;
}


function createGroups(population:PopulationFit[]){

	let populationGroup:PopulationGroup[] = [];
	let sumOfFitness = 0;
	for (let i = 0; i < bitesLength; i++) {

		const chrThatFits:PopulationFit[] = population.filter((chromosome:PopulationFit) => chromosome.fitness === i )
		const chromosomes = chrThatFits.map((item:any) => {return item.chromosome});

		const group = {
			fitness: i,
			chromosomes : chromosomes,
			probability: 0
		}

		if(chromosomes.length>0){
			populationGroup.push(group);
			sumOfFitness = sumOfFitness + i;
		}
	}

	return {populationGroup, sumOfFitness};
}


function calcProv(populationGroup:PopulationGroup[], sumFitness:number){

	let preProb = 0.0;
	for (let i = 0; i < populationGroup.length; i++){
		let prob = preProb + (populationGroup[i].fitness / sumFitness)
		populationGroup[i].probability = prob;
		preProb = prob;
	}

	return populationGroup;
}


function getOneWinner(populationGroupProbs:PopulationGroup[]){
	const randomWinner = Math.random();
	console.log(randomWinner);
	let modRandom = Math.min(randomWinner + 0.2, 1);
	let winnerIndex = 0;
	for (let i = 0; i < populationGroupProbs.length; i++){
		if(modRandom > populationGroupProbs[i].probability){
			winnerIndex = i+1;
		}
	}
	if (winnerIndex >= populationGroupProbs.length) {
    	winnerIndex = populationGroupProbs.length - 1;
	}
	console.log(`winnerIndex ${winnerIndex} and fitness ${populationGroupProbs[winnerIndex].fitness}`)

	let winnerChomosome = 0;
	if(populationGroupProbs[winnerIndex].chromosomes.length > 1){
		//console.log("winner long")
		winnerChomosome = Math.floor(Math.random() * Math.floor(populationGroupProbs[winnerIndex].chromosomes.length));
	}
	console.log(`winner choosen is ${winnerChomosome}`)

	return populationGroupProbs[winnerIndex].chromosomes[winnerChomosome]
}


function getWinnersN(populationGroupProbs:PopulationGroup[], nOfWinners:number):string[]{

	let winners:string[] = []
	for (let i = 0; i < nOfWinners; i++){
		const winner = getOneWinner(populationGroupProbs);
		//console.log(winner)
		winners.push(winner);
	}
	return winners
}


function mergeGenes(chromosomesToMerge:string[]):string[]{

	const shouldMerge =  Math.random();
	let newChromOne = chromosomesToMerge[0];
	let newChromTwo = chromosomesToMerge[1];

	if(shouldMerge <= crossOverProb){
		const cutHere = Math.floor(Math.random() * Math.floor(bitesLength))
		console.log(`Time to merge 👩‍❤️‍💋‍👨, cut here  ${cutHere} random ${shouldMerge}`)
		newChromOne = `${chromosomesToMerge[0].slice(0,cutHere)}${chromosomesToMerge[1].slice(cutHere)}`
		newChromTwo = `${chromosomesToMerge[1].slice(0,cutHere)}${chromosomesToMerge[0].slice(cutHere)}`
	}else {
		console.log(`NO merge  🧙🏼 random ${shouldMerge}`)
	}

	return [newChromOne, newChromTwo];
}


function invertirBit(stringBinario: string, posicion: number): string {
    return stringBinario.substring(0, posicion) 
           + (stringBinario[posicion] === '0' ? '1' : '0') 
           + stringBinario.substring(posicion + 1);
}


function mutate(mergedWinners:string[]):string[]{
	let mutatedChromOne = mergedWinners[0];
	let mutatedChromTwo = mergedWinners[1];

	for (let i = 0; i < bitesLength; i++){
		const cancerTime =  Math.random();
		if(cancerTime < mutationProb){
			console.log(` 🦠 Mutating bite ${i} in ${mergedWinners[0]}`);
			mutatedChromOne = invertirBit(mergedWinners[0], i);
			console.log(`🦠 New Mutated ${mutatedChromOne}`);
		}
	}

	for (let i = 0; i < bitesLength; i++){
		const cancerTime =  Math.random();
		if(cancerTime < mutationProb){
			console.log(`🦠 Mutating bite ${i} in ${mergedWinners[1]}`);
			mutatedChromTwo = invertirBit(mergedWinners[1], i);
			console.log(`🦠 New Mutated ${mutatedChromTwo}`);
		}
	}

	return [ mutatedChromOne,mutatedChromTwo ]
}

//!! This method makes the population return to the mean 
function replaceInPopulation(population:PopulationFit[], toFind:string[], toReplace:string[]){

	for (let i = 0; i < toFind.length; i++){
		let toUpdateIndex = population.findIndex((chromosome:PopulationFit) => chromosome.chromosome === toFind[i]);
		if(toUpdateIndex !== -1) {
			//console.log("find One");
			population[toUpdateIndex].chromosome = toReplace[i];
			population[toUpdateIndex].fitness = calFitness(toReplace[i]);
		}
	}
	return population;
}


function addToPopulation(population:PopulationFit[], toAdd:string[]){

	for (let i = 0; i < toAdd.length; i++){

		let fitness = calFitness(toAdd[i]);
		let chromosomeToAdd:PopulationFit = {
    		chromosome: toAdd[i],
			fitness: fitness
    	}
		population.push(chromosomeToAdd);
	}
	return population;
}


function checkFind(population:PopulationFit[]){
	
	let findIndex = population.findIndex((chromosome:PopulationFit) => chromosome.chromosome === discoverThis);
	return findIndex
}


function removeLeastFittest(population:PopulationFit[]){
	
	population.sort((a, b) => a.fitness - b.fitness);
	population = population.slice(2);
	return population
}


function init(generations:number){
	
	let  population = generate(100);
	console.log(population);

	for (let i = 0; i < generations; i++){
		const  { populationGroup, sumOfFitness } = createGroups(population);
		
		const populationGroupProbs = calcProv(populationGroup, sumOfFitness)
		console.log(populationGroupProbs);

		const winners = getWinnersN(populationGroupProbs, 2);
		//console.log("winners chromosomes",winners);

		const mergedWinners = mergeGenes(winners);
		//console.log("mergedWinners",mergedWinners)

		const mutated = mutate(mergedWinners);
		//console.log("mutated",mutated)

		population = addToPopulation(population, mutated);
		population = removeLeastFittest(population);
		const solution = checkFind(population);

		if(solution != -1){
			console.log(population);
			console.log("Solution population index", solution)
			console.log("generation n", i)
			console.log("🗝 SOLUTION!!!", population[solution])
			break;
		}
	}
}


init(500);

