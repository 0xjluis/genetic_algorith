# Genetic Algorithm Implementation in TypeScript

This project implements a basic genetic algorithm in TypeScript. The algorithm is designed to simulate evolutionary processes to discover a specific binary string. It includes functions for generating an initial population, calculating fitness, performing selection, crossover, mutation, and managing the population over several generations.

## Overview

The genetic algorithm is built to evolve a population of chromosomes (binary strings) towards a predefined target binary string. Each chromosome's fitness is calculated based on its similarity to the target string. The algorithm includes mechanisms for selection, crossover, mutation, and fitness evaluation to guide the evolution process.

## Features

- **Population Generation**: Generate an initial population of chromosomes represented as binary strings.
- **Fitness Calculation**: Calculate the fitness of each chromosome based on its similarity to the target string.
- **Selection**: Select chromosomes for reproduction based on their fitness.
- **Crossover**: Perform crossover between pairs of chromosomes to produce new offspring.
- **Mutation**: Apply random mutations to chromosomes.
- **Population Management**: Add new chromosomes to the population and remove the least fit.

## Functions

- `generate(length: number)`: Generates an initial population of chromosomes.
- `calFitness(chromosome: string)`: Calculates the fitness of a chromosome.
- `createGroups(population: PopulationFit[])`: Groups the population by fitness.
- `calcProv(populationGroup: PopulationGroup[], sumFitness: number)`: Calculates the probability of selection for each group.
- `getOneWinner(populationGroupProbs: PopulationGroup[])`: Selects one chromosome based on fitness probabilities.
- `getWinnersN(populationGroupProbs: PopulationGroup[], nOfWinners: number)`: Selects multiple winners.
- `mergeGenes(chromosomesToMerge: string[])`: Performs crossover on a pair of chromosomes.
- `mutate(mergedWinners: string[])`: Applies mutation to chromosomes.
- `replaceInPopulation(population: PopulationFit[], toFind: string[], toReplace: string[])`: Replaces specific chromosomes in the population.
- `addToPopulation(population: PopulationFit[], toAdd: string[])`: Adds new chromosomes to the population.
- `checkFind(population: PopulationFit[])`: Checks if the target string has been found in the population.
- `removeLeastFittest(population: PopulationFit[])`: Removes the least fit chromosomes from the population.
- `init(generations: number)`: Initializes and runs the genetic algorithm for a given number of generations.

## How to Run

Ensure you have TypeScript and Node.js installed. Run the script using Node:

bashCopy code

`npm i `

then 
`npm run dale `