package main

import (
	"io/ioutil"
	"log"
	"sort"
	"strings"
)

type position struct {
	x int
	y int
}

func (pos position) getNeighbours(matrix map[position]int) []position {
	possibleDirections := []position{
		{x: pos.x - 1, y: pos.y},
		{x: pos.x, y: pos.y - 1},
		{x: pos.x + 1, y: pos.y},
		{x: pos.x, y: pos.y + 1},
	}

	return possibleDirections
}

type step struct {
	position position
	distance int
}

var alphabet = "abcdefghijklmnopqrstuvwxyz"

func indexOf(element string, data []string) int {
	for k, v := range data {
		if element == v {
			return k
		}
	}

	return -1
}

func parseLetter(
	letter string,
	potentialCurrentPosisions *[]position,
	end *position,
	x, y int,
	partTwo bool,
) int {
	if letter == "S" {
		*potentialCurrentPosisions = append(*potentialCurrentPosisions, position{x: x, y: y})

		return 0
	}

	if letter == "E" {
		end.x = x
		end.y = y

		return 25
	}

	if letter == "a" && partTwo {
		*potentialCurrentPosisions = append(*potentialCurrentPosisions, position{x: x, y: y})
	}

	return indexOf(letter, strings.Split(alphabet, ""))
}

func breadthFirstSearch(matrix map[position]int, start position, end position) (position, bool, int) {
	visitedPositions := make(map[position]bool)
	stepQueue := []step{{position: start, distance: 0}}

	for len(stepQueue) != 0 {
		position := stepQueue[0].position
		distance := stepQueue[0].distance

		if position == end {
			return position, true, distance
		}

		for _, direction := range position.getNeighbours(matrix) {
			_, isInBounds := matrix[direction]
			if isInBounds && !visitedPositions[direction] && matrix[position]+1 >= matrix[direction] {
				stepQueue = append(stepQueue, step{position: direction, distance: distance + 1})
				visitedPositions[direction] = true
			}
		}

		stepQueue = stepQueue[1:]
	}

	return start, false, 0
}

func DayTwelve(fileName string, partTwo bool) int {
	body, err := ioutil.ReadFile(fileName)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}

	var matrix map[position]int = make(map[position]int)
	var destination position
	var startingPositions []position

	for y, line := range strings.Split(string(body), "\n") {
		if line == "" {
			continue
		}

		for x, letter := range strings.Split(string(line), "") {
			matrix[position{x: x, y: y}] = parseLetter(letter, &startingPositions, &destination, x, y, partTwo)
		}
	}

	var distances []int
	for _, startingPosition := range startingPositions {
		_, foundIt, distance := breadthFirstSearch(matrix, startingPosition, destination)

		if foundIt {
			distances = append(distances, distance)
		}
	}

	sort.Ints(distances)

	return distances[0]
}
