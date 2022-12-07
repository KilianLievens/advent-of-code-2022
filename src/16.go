package main

import (
	"log"
	"os"
	"strconv"
	"strings"
)

type valve struct {
	flowRate int
	tunnels  []int
}

var valves []valve

type state struct {
	valveIndex int
	timeLeft   int
	openState  string
	elephants  int
}

var stateMap map[state]int = make(map[state]int)

func hashOpenState(aaaaaaah []bool) string {
	res := ""
	for _, sendHelp := range aaaaaaah {
		if sendHelp {
			res = res + "1"
		} else {
			res = res + "0"
		}
	}

	return res
}

func maxFlow(valveIndex int, timeLeft int, openState []bool, elephants int, startIndex int, totalTime int) int {
	curState := state{
		valveIndex: valveIndex,
		timeLeft:   timeLeft,
		openState:  hashOpenState(openState),
		elephants:  elephants,
	}
	stateRes, ok := stateMap[curState]

	if ok {
		return stateRes
	}

	if timeLeft <= 0 {
		if elephants > 0 {
			res := maxFlow(startIndex, totalTime, openState, elephants-1, startIndex, totalTime)
			stateMap[curState] = res
			return res
		}
		return 0
	}

	max := 0
	newOpenState := make([]bool, len(openState))
	newNewOpenState := make([]bool, len(openState))
	copy(newOpenState, openState)
	copy(newNewOpenState, openState)

	currentValve := valves[valveIndex]

	// Open valve
	if !newOpenState[valveIndex] && currentValve.flowRate != 0 {
		newOpenState[valveIndex] = true
		score := currentValve.flowRate * (timeLeft - 1)
		for _, tunnel := range currentValve.tunnels {
			res := maxFlow(tunnel, timeLeft-2, newOpenState, elephants, startIndex, totalTime) + score
			if res > max {
				max = res
			}
		}
	}

	// Leave the valve as-is
	for _, tunnel := range currentValve.tunnels {
		res := maxFlow(tunnel, timeLeft-1, newNewOpenState, elephants, startIndex, totalTime)
		if res > max {
			max = res
		}
	}

	stateMap[curState] = max

	return max
}

func DaySixteen(filePath string, time, elephants int) int {
	body, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}

	var valveNameMap = make(map[string]int)
	var aaIndex = 0

	var lines = strings.Split(string(body), "\n")

	for vI, line := range lines {
		if line == "" {
			continue
		}

		var segments = strings.Split(line, " ")
		var v valve

		name := segments[1]
		v.flowRate, _ = strconv.Atoi(strings.TrimRight(strings.TrimLeft(segments[4], "rate="), ";"))

		valveNameMap[name] = vI

		if name == "AA" {
			aaIndex = vI
		}

		valves = append(valves, v)
	}

	for _, line := range lines {
		if line == "" {
			continue
		}

		var segments = strings.Split(line, " ")

		name := segments[1]
		var tunnels []int
		for _, seggy := range segments[9:] {
			tunnelIndex := valveNameMap[strings.TrimRight(seggy, ",")]
			tunnels = append(tunnels, tunnelIndex)
		}

		valveIndex := valveNameMap[name]
		valves[valveIndex].tunnels = tunnels
	}

	return maxFlow(aaIndex, time, make([]bool, len(valves)), elephants, aaIndex, time)
}
