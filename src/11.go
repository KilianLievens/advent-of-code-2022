package main

import (
	"sort"
)

type Monkey struct {
	items           []int
	calcWorry       func(item int) int
	calcThrowTarget func(worry int) int
	divisor         int
}

var ExampleMonkeys []Monkey = []Monkey{
	{
		items:     []int{79, 98},
		calcWorry: func(item int) int { return item * 19 },
		calcThrowTarget: func(worry int) int {
			if worry%23 == 0 {
				return 2
			}
			return 3
		},
		divisor: 23,
	},
	{
		items:     []int{54, 65, 75, 74},
		calcWorry: func(item int) int { return item + 6 },
		calcThrowTarget: func(worry int) int {
			if worry%19 == 0 {
				return 2
			}
			return 0
		},
		divisor: 19,
	},
	{
		items:     []int{79, 60, 97},
		calcWorry: func(item int) int { return item * item },
		calcThrowTarget: func(worry int) int {
			if worry%13 == 0 {
				return 1
			}
			return 3
		},
		divisor: 13,
	},
	{
		items:     []int{74},
		calcWorry: func(item int) int { return item + 3 },
		calcThrowTarget: func(worry int) int {
			if worry%17 == 0 {
				return 0
			}
			return 1
		},
		divisor: 17,
	},
}

var ActualMonkeys []Monkey = []Monkey{
	{
		items:     []int{72, 64, 51, 57, 93, 97, 68},
		calcWorry: func(item int) int { return item * 19 },
		calcThrowTarget: func(worry int) int {
			if worry%17 == 0 {
				return 4
			}
			return 7
		},
		divisor: 17,
	},
	{
		items:     []int{62},
		calcWorry: func(item int) int { return item * 11 },
		calcThrowTarget: func(worry int) int {
			if worry%3 == 0 {
				return 3
			}
			return 2
		},
		divisor: 3,
	},
	{
		items:     []int{57, 94, 69, 79, 72},
		calcWorry: func(item int) int { return item + 6 },
		calcThrowTarget: func(worry int) int {
			if worry%19 == 0 {
				return 0
			}
			return 4
		},
		divisor: 19,
	},
	{
		items:     []int{80, 64, 92, 93, 64, 56},
		calcWorry: func(item int) int { return item + 5 },
		calcThrowTarget: func(worry int) int {
			if worry%7 == 0 {
				return 2
			}
			return 0
		},
		divisor: 7,
	},
	{
		items:     []int{70, 88, 95, 99, 78, 72, 65, 94},
		calcWorry: func(item int) int { return item + 7 },
		calcThrowTarget: func(worry int) int {
			if worry%2 == 0 {
				return 7
			}
			return 5
		},
		divisor: 2,
	},
	{
		items:     []int{57, 95, 81, 61},
		calcWorry: func(item int) int { return item * item },
		calcThrowTarget: func(worry int) int {
			if worry%5 == 0 {
				return 1
			}
			return 6
		},
		divisor: 5,
	},
	{
		items:     []int{79, 99},
		calcWorry: func(item int) int { return item + 2 },
		calcThrowTarget: func(worry int) int {
			if worry%11 == 0 {
				return 3
			}
			return 1
		},
		divisor: 11,
	},
	{
		items:     []int{68, 98, 62},
		calcWorry: func(item int) int { return item + 3 },
		calcThrowTarget: func(worry int) int {
			if worry%13 == 0 {
				return 5
			}
			return 6
		},
		divisor: 13,
	},
}

func leastCommonMultiple(a, b int) int {
	i := 1
	for {
		aMultiple := a * i
		if aMultiple%b == 0 {
			return aMultiple
		}

		i++
	}
}

func FindWorryStopper(monkeys []Monkey) int {
	worryStopper := 1
	for _, monkey := range monkeys {
		worryStopper = leastCommonMultiple(worryStopper, monkey.divisor)
	}

	return worryStopper
}

func DayEleven(monkeys []Monkey, rounds int, reducer func(int) int) int {
	// Don't mutate the monkeys
	localMonkeys := append([]Monkey{}, monkeys...)
	inspections := make([]int, len(localMonkeys))

	for round := 1; round <= rounds; round++ {
		for mI, monkey := range localMonkeys {
			for _, item := range monkey.items {
				worry := reducer(monkey.calcWorry(item))

				target := monkey.calcThrowTarget(worry)
				inspections[mI] = inspections[mI] + 1
				localMonkeys[target].items = append(localMonkeys[target].items, worry)
			}

			localMonkeys[mI].items = nil
		}
	}

	sort.Slice(inspections, func(i, j int) bool { return inspections[i] > inspections[j] })

	return inspections[0] * inspections[1]
}
