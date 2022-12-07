package main

import (
	"log"
	"os"
	"strconv"
	"strings"
)

type coordinate struct{ x, y int }

func dropSand(
	sandCoord coordinate,
	rockMap map[coordinate]bool,
	endOfTheMap int,
) (newCoord coordinate, cantMove bool, done bool) {
	if sandCoord.y > endOfTheMap {
		return sandCoord, false, true
	}

	down := coordinate{x: sandCoord.x, y: sandCoord.y + 1}
	_, has := rockMap[down]
	if !has {
		return down, false, false
	}

	downLeft := coordinate{x: sandCoord.x - 1, y: sandCoord.y + 1}
	_, has = rockMap[downLeft]
	if !has {
		return downLeft, false, false
	}

	downRight := coordinate{x: sandCoord.x + 1, y: sandCoord.y + 1}
	_, has = rockMap[downRight]
	if !has {
		return downRight, false, false
	}

	rockMap[sandCoord] = true

	if sandCoord.y == 0 {
		return sandCoord, true, true
	}

	return sandCoord, true, false
}

func getLine(start coordinate, end coordinate) []coordinate {
	var res []coordinate

	if start.y == end.y {
		if start.x > end.x {
			for j := end.x; j <= start.x; j++ {
				res = append(res, coordinate{x: j, y: start.y})
			}

			return res
		}

		for j := start.x; j <= end.x; j++ {
			res = append(res, coordinate{x: j, y: start.y})
		}

		return res
	}

	if start.y > end.y {
		for j := end.y; j <= start.y; j++ {
			res = append(res, coordinate{x: start.x, y: j})
		}

		return res
	}

	for j := start.y; j <= end.y; j++ {
		res = append(res, coordinate{x: start.x, y: j})
	}

	return res
}

func DayFourteen(filePath string, hasFloor bool) int {
	body, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}

	var rockMap map[coordinate]bool = make(map[coordinate]bool)
	var lowestY = -1

	for _, line := range strings.Split(string(body), "\n") {
		if line == "" {
			continue
		}

		var rockCoords []coordinate
		for _, rawRockCoord := range strings.Split(line, " -> ") {
			rawCoords := strings.Split(rawRockCoord, ",")

			var coord coordinate
			coord.x, _ = strconv.Atoi(rawCoords[0])
			coord.y, _ = strconv.Atoi(rawCoords[1])

			rockCoords = append(rockCoords, coord)
		}

		var prevCoord coordinate
		for i, coord := range rockCoords {

			if coord.y > lowestY {
				lowestY = coord.y
			}

			if i != 0 {
				for _, lineCoord := range getLine(prevCoord, coord) {
					rockMap[lineCoord] = true
				}
			}

			prevCoord = coord
		}
	}

	if hasFloor == true {
		for _, lineCoord := range getLine(coordinate{x: 0, y: lowestY + 2}, coordinate{x: 1000, y: lowestY + 2}) {
			rockMap[lineCoord] = true
		}
	}

	sandCounter := 0
	done := false
	for done != true {
		sand := coordinate{500, 0}
		sandCounter++

		nextSand := false
		for nextSand != true && done != true {
			sand, nextSand, done = dropSand(sand, rockMap, lowestY+10)
		}
	}

	if hasFloor == true {
		return sandCounter
	}

	// Last one went overboard
	return sandCounter - 1
}
