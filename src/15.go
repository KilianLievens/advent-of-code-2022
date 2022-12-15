package main

import (
	"log"
	"math"
	"os"
	"strconv"
	"strings"
)

// Very tired. Not in the mood for fancy.
type senny struct {
	coord    coordinate
	distance int
}

func calculateManhattenDistance(a coordinate, b coordinate) (distance int) {
	// No Abs on ints? What?
	return int(math.Abs(float64(a.x-b.x))) + int(math.Abs(float64(a.y-b.y)))
}

func DayFifteen(filePath string, row int, search bool, searchDistance int) int {
	body, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}

	var beaconMap map[coordinate]bool = make(map[coordinate]bool)
	var sensors []senny

	for _, line := range strings.Split(string(body), "\n") {
		if line == "" {
			continue
		}

		var sensor coordinate
		var beacon coordinate
		segments := strings.Split(line, " ")

		sensor.x, _ = strconv.Atoi(strings.TrimRight(strings.TrimLeft(segments[2], "x="), ","))
		sensor.y, _ = strconv.Atoi(strings.TrimRight(strings.TrimLeft(segments[3], "y="), ":"))
		beacon.x, _ = strconv.Atoi(strings.TrimRight(strings.TrimLeft(segments[8], "x="), ","))
		beacon.y, _ = strconv.Atoi(strings.TrimLeft(segments[9], "y="))

		distance := calculateManhattenDistance(sensor, beacon)
		sensors = append(sensors, senny{coord: sensor, distance: distance})

		beaconMap[beacon] = true
	}

	// Very tired. Not in the mood for fancy.
	if search == false {
		counter := 0
		for x := -10_000_000; x < 10_000_000; x++ {
			coord := coordinate{x, row}
			isCloser := false
			for _, sensor := range sensors {
				xDist := calculateManhattenDistance(coord, sensor.coord)
				if xDist <= sensor.distance {
					_, ooohCountered := beaconMap[coord]

					if ooohCountered == false {
						isCloser = true
					}
				}
			}
			if isCloser {
				counter++
			}
		}

		return counter
	}

	// Very tired. Not in the mood for fancy.
	for x := 0; x <= searchDistance; x++ {
		for y := 0; y <= searchDistance; y++ {
			coord := coordinate{x, y}
			isCovered := false
			maxSkip := 0

			for _, sensor := range sensors {
				xDist := calculateManhattenDistance(coord, sensor.coord)
				delta := sensor.distance - xDist
				if delta >= 0 {
					isCovered = true
				}
				if delta > maxSkip {
					maxSkip = delta
				}
			}

			y = y + maxSkip
			if !isCovered {
				return (4000000 * x) + y
			}
		}
	}

	return -1
}
