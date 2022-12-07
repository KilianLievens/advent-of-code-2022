package main

import "testing"

func TestDayElevenWithExampleInput(t *testing.T) {
	res := DayEleven(ExampleMonkeys, 20, func(worry int) int { return worry / 3 })
	expected := 10605
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayElevenWithActualInput(t *testing.T) {
	res := DayEleven(ActualMonkeys, 20, func(worry int) int { return worry / 3 })
	expected := 99852
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayElevenPartTwoWithExampleInput(t *testing.T) {
	worryStopper := FindWorryStopper(ExampleMonkeys)
	res := DayEleven(ExampleMonkeys, 10_000, func(worry int) int { return worry % worryStopper })
	expected := 2713310158
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}

func TestDayElevenPartTwoWithActualInput(t *testing.T) {
	worryStopper := FindWorryStopper(ActualMonkeys)
	res := DayEleven(ActualMonkeys, 10_000, func(worry int) int { return worry % worryStopper })
	expected := 25935263541
	if res != expected {
		t.Errorf("Expected %d, got %d", expected, res)
	}
}
